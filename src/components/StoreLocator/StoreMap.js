import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker
} from '@react-google-maps/api';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { styled } from 'linaria/react';
import { LocationStateContext } from './StoreLocator';
import { useMapState } from './useMapState';
import { useShopConfig } from '@jetshop/core/hooks/useShopConfig';
import throwErrorInDev from '@jetshop/core/helpers/throwErrorInDev';

import { theme } from '../Theme';

const Wrapper = styled('div')`
  flex: 0 0 60%;

  .map-container {
    min-height: 100%;

    ${theme.below.lg} {
      height: 50vh;
    }
  }
`;

const LoadingElement = () => <div style={{ height: '100%' }}></div>;

const StoreMap = ({ stores, userLocation, closestStore }) => {
  const ref = useRef();
  const locationState = useContext(LocationStateContext);
  const { isOpen, infoId, showInfo } = useMapState();
  const [mapsLoaded, setMapsLoaded] = useState(false);

  const { googleMapsApiKey } = useShopConfig();

  throwErrorInDev(
    typeof googleMapsApiKey === 'undefined',
    'Make sure googleMapsApiKey is defined in your shop.config.js. See https://developers.google.com/maps/documentation/javascript/get-api-key'
  );

  useEffect(() => {
    if (stores && mapsLoaded) {
      // Stores are loaded, fit bounds
      const bounds = new window.google.maps.LatLngBounds();
      stores
        .filter(store => store.coordinates)
        .map(store =>
          bounds.extend(
            new window.google.maps.LatLng(
              store?.coordinates?.latitude,
              store?.coordinates?.longitude
            )
          )
        );

      // Don't zoom in too far on only one marker
      if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
        const extendPoint1 = new window.google.maps.LatLng(
          bounds.getNorthEast().lat() + 0.01,
          bounds.getNorthEast().lng() + 0.01
        );
        const extendPoint2 = new window.google.maps.LatLng(
          bounds.getNorthEast().lat() - 0.01,
          bounds.getNorthEast().lng() - 0.01
        );
        bounds.extend(extendPoint1);
        bounds.extend(extendPoint2);
      }

      ref.current.fitBounds(bounds);
    }
  }, [mapsLoaded, stores]);

  useEffect(() => {
    if (closestStore && mapsLoaded) {
      // User has shared its location and the closest store has been calculated
      const bounds = new window.google.maps.LatLngBounds();

      bounds.extend(
        new window.google.maps.LatLng(
          userLocation.latitude,
          userLocation.longitude
        )
      );
      bounds.extend(
        new window.google.maps.LatLng(
          closestStore?.coordinates?.latitude,
          closestStore?.coordinates?.longitude
        )
      );

      ref.current.fitBounds(bounds);
    }
  }, [userLocation, closestStore, mapsLoaded]);

  return (
    <Wrapper>
      <>
        <LoadScript
          loadingElement={<LoadingElement />}
          preventGoogleFontsLoading={true}
          googleMapsApiKey={googleMapsApiKey}
        >
          <GoogleMap
            defaultZoom={6}
            mapContainerClassName="map-container"
            defaultCenter={{ lat: 59.247948, lng: 14.755806 }}
            onLoad={map => {
              ref.current = map;
              setMapsLoaded(true);
            }}
          >
            <>
              {userLocation.latitude && userLocation.longitude && (
                <Marker
                  position={{
                    lat: userLocation.latitude,
                    lng: userLocation.longitude
                  }}
                />
              )}

              {mapsLoaded &&
                stores
                  .filter(store => store.coordinates)
                  .map((store, index) => {
                    const isActive = store.id === locationState.activeLocation;

                    return (
                      <React.Fragment key={store.id}>
                        <Marker
                          icon={{
                            path:
                              'M23.011 12.068C23.011 20.7463 11.8531 28.1849 11.8531 28.1849C11.8531 28.1849 0.695312 20.7463 0.695312 12.068C0.695313 9.10875 1.87087 6.27071 3.96337 4.17821C6.05587 2.08571 8.89391 0.910156 11.8531 0.910156C14.8124 0.910156 17.6504 2.08571 19.7429 4.17821C21.8354 6.27071 23.011 9.10875 23.011 12.068Z',
                            fillColor: isActive ? theme.colors.blue : 'white',
                            fillOpacity: 1,
                            strokeColor: theme.colors.blue,
                            anchor: new window.google.maps.Point(12, 32),
                            scale: isActive ? 1.25 : 1.2,
                            labelOrigin: new window.google.maps.Point(12, 14)
                          }}
                          zIndex={index}
                          position={{
                            lat: store?.coordinates?.latitude,
                            lng: store?.coordinates?.longitude
                          }}
                          label={{
                            text: `${index + 1}`,
                            color: isActive ? 'white' : theme.colors.blue,
                            fontSize: '16px'
                          }}
                          onMouseOver={() => {
                            locationState.setHighlightedLocation(store.id);
                          }}
                          onMouseOut={() =>
                            locationState.setHighlightedLocation(null)
                          }
                          onClick={() => showInfo(store.id)}
                        />
                        {isOpen && infoId === store.id && (
                          <InfoWindow
                            key={`infowindow-${store.id}`}
                            onCloseClick={showInfo}
                            position={{
                              lat: store?.coordinates?.latitude,
                              lng: store?.coordinates?.longitude
                            }}
                            options={{
                              pixelOffset: new window.google.maps.Size(50, 0)
                            }}
                          >
                            <div
                              style={{
                                background: 'white',
                                padding: '1em',
                                minWidth: '200px',
                                fontSize: '14px',
                                lineHeight: 1.5
                              }}
                            >
                              <p>
                                <strong>{store.name}</strong>
                              </p>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: store.address1
                                }}
                              />
                            </div>
                          </InfoWindow>
                        )}
                      </React.Fragment>
                    );
                  })}
            </>
          </GoogleMap>
        </LoadScript>
      </>
    </Wrapper>
  );
};

export default StoreMap;
