import t from '@jetshop/intl';
import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { styled } from 'linaria/react';
import { fuzzySearch } from '@jetshop/ui/fuzzySearch';
import { Above } from '@jetshop/ui/Breakpoints';
import { distance } from '@jetshop/core/helpers/distance';

import MaxWidth from '../Layout/MaxWidth';
import LoadingPage from '../LoadingPage';
import storeLocatorQuery from './StoreLocator.gql';
import StoreSearch from './StoreSearch';
import StoreList from './StoreList';
import StoreMap from './StoreMap';
import { useLocationState } from './useLocationState';
import Head from '@jetshop/core/components/Head';
import { Intl } from '@jetshop/intl';

import { theme } from '../Theme';

const Flex = styled('div')`
  display: flex;

  h1 {
    margin-bottom: 0.5em;
  }

  > div {
    flex: 1;
  }

  ${theme.below.lg} {
    flex-direction: column;
  }
`;

const Header = styled(Flex)`
  padding: 3rem 0;
  background: #fff;
`;

const StoreLocatorWrapper = styled(MaxWidth)`
  ${theme.below.lg} {
    padding: 0;
  }
`;

const StoreLocatorContent = styled(Flex)`
  height: 60vh;

  ${theme.below.lg} {
    height: unset;
  }
`;

const SearchAndListContainer = styled('div')`
  flex: 0 0 40% !important;
  height: 100%;
`;

export const LocationStateContext = React.createContext(null);

const StoreLocator = () => {
  const locationState = useLocationState();
  const [search, setSearch] = useState('');
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null
  });
  const [closestStore, setClosestStore] = useState(null);
  const [distances, setDistances] = useState({});

  const genDistances = stores => {
    if (userLocation.latitude == null) return;

    let distances = {};
    let closestStore = {};
    stores
      .filter(store => store.coordinates)
      .forEach(store => {
        const thisDistance = distance(userLocation, store.coordinates);

        distances[store.id] = thisDistance;

        // If we haven't got a store in the closestStore obj yet, set it to this one
        if (!closestStore.distance) {
          closestStore = {
            ...store,
            distance: thisDistance
          };
          return;
        }

        // If this store is closer than the one currently stored in closestStore,
        // override it
        if (thisDistance < closestStore.distance) {
          closestStore = { ...store, distance: thisDistance };
        }
      });

    setDistances(distances);
    setClosestStore(closestStore);
  };

  return (
    <>
      <Intl>{t => <Head data={{ title: t('Find store') }} />}</Intl>

      <Header>
        <MaxWidth>
          <div>
            <h1>{t('Find store')}</h1>
            <p>
              {t(
                'This is where you find our stores. Get informed about the stock status in your local store here. Find and select the store that is closest to you.'
              )}
            </p>
          </div>
        </MaxWidth>
      </Header>
      <StoreLocatorWrapper>
        <StoreLocatorContent>
          <Query query={storeLocatorQuery}>
            {({ data, loading }) => {
              if (loading) return <LoadingPage />;

              if (userLocation.latitude && !closestStore)
                genDistances(data.stores);

              const stores =
                search.length === 0
                  ? data.stores
                  : fuzzySearch({
                      data: data.stores,
                      keys: ['name', 'address1'],
                      searchTerm: search
                    });

              const storeSearchProps = { search, setSearch };
              const storeListProps = {
                stores,
                userLocation,
                setUserLocation,
                distances
              };
              const storeMapProps = {
                stores,
                userLocation,
                closestStore,
                distances
              };

              return (
                <LocationStateContext.Provider value={locationState}>
                  <Above breakpoint="lg">
                    {matches =>
                      matches ? (
                        <>
                          <SearchAndListContainer>
                            <StoreSearch {...storeSearchProps} />
                            <StoreList {...storeListProps} />
                          </SearchAndListContainer>
                          <StoreMap {...storeMapProps} />
                        </>
                      ) : (
                        <>
                          <StoreSearch {...storeSearchProps} />
                          <StoreMap {...storeMapProps} />
                          <StoreList {...storeListProps} />
                        </>
                      )
                    }
                  </Above>
                </LocationStateContext.Provider>
              );
            }}
          </Query>
        </StoreLocatorContent>
      </StoreLocatorWrapper>
    </>
  );
};

export default StoreLocator;
