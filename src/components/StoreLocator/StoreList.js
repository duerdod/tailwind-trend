import t from '@jetshop/intl';
import React, { useContext } from 'react';
import { styled } from 'linaria/react';

import { cx, css } from 'linaria';

import { StoreMarker } from './StoreMarker';

import { ReactComponent as CarrotSvg } from '@jetshop/ui/svg/Carrot.svg';
import { ReactComponent as DirectionsSvg } from '../../svg/Directions.svg';
import { LocationStateContext } from './StoreLocator';
import UserLocation from './UserLocation';

import { theme } from '../Theme';

const StoreListContainer = styled('ul')`
  height: calc(100% - 94px);
  overflow-y: auto;

  .highlight {
    background: yellow;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

const StoreContainer = styled('li')`
  width: 100%;
  background: ${theme.colors.white};
  padding: 24px;
  margin: 8px 0;

  font-size: 14px;
  line-height: 1.4;

  cursor: pointer;

  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }

  > div {
    display: flex;

    &.expanded-content {
      padding: 24px 24px 0 36px;
      max-height: 0;
      overflow: hidden;
      transition-property: max-height;
      transition-duration: 0.2s;
    }
  }

  &.expanded {
    > div.expanded-content {
      max-height: 600px;
    }

    svg.carrot {
      transform: rotate(0deg);
    }
  }

  :focus {
    outline: 1px solid ${theme.colors.blue};
  }

  svg.carrot {
    transition-property: transform;
    transition-duration: 0.2s;
  }
`;

const StoreColumn = styled('div')`
  flex: 1;
  margin-top: -4px;
  position: relative;

  padding: 0 16px 0 0;

  .contact-icon {
    position: absolute;
    left: -6px;
  }

  a {
    color: #000;
    padding: 4px 0 8px;
  }
`;

const secondStoreColumn = css`
  padding: 0 8px 0 16px;
`;

const CarrotContainer = styled('div')`
  flex: 0 0 24px;
  background: ${theme.colors.background};
  width: 24px;
  height: 24px;
  border-radius: 50%;
  align-self: center;

  svg {
    width: 12px;
    height: 12px;
    margin: 6px;

    transform: rotate(-90deg);
  }
`;

const humanDistance = distance =>
  distance > 10
    ? t('{km} km', { km: Math.round(distance) })
    : distance > 1
    ? t('{km} km', { km: distance.toFixed(1) })
    : t('{m} m', { m: Math.round(distance * 1000) });

const contactParser = html =>
  html
    ?.replace('Tel: ', '<span class="contact-icon">📞</span>')
    ?.replace('Email: ', '<span class="contact-icon">🖂</span>');

const Carrot = () => (
  <CarrotContainer>
    <CarrotSvg className="carrot" />
  </CarrotContainer>
);

const Store = ({
  storeNr,
  distances,
  store: { id, name, address1, openHours, description, coordinates, contact }
}) => {
  const locationState = useContext(LocationStateContext);

  const active = id === locationState.activeLocation;
  const expanded = id === locationState.expandedLocation;

  return (
    <StoreContainer
      onMouseEnter={() => locationState.setHighlightedLocation(id)}
      onMouseLeave={() => locationState.setHighlightedLocation(null)}
      onClick={() => locationState.toggleExpandedLocation(id)}
      onKeyPress={e => {
        if ((e.keyCode || e.which) === 13)
          locationState.toggleExpandedLocation(id);
      }}
      tabIndex={0}
      className={cx(expanded ? 'expanded' : null)}
    >
      <div>
        <StoreMarker nr={storeNr} active={active} />
        <StoreColumn>
          <p>
            <strong dangerouslySetInnerHTML={{ __html: name }} />
          </p>
          <div dangerouslySetInnerHTML={{ __html: address1 }} />
        </StoreColumn>
        <StoreColumn className={secondStoreColumn}>
          <p>
            <strong>{t('Opening hours')}</strong>
          </p>
          <div dangerouslySetInnerHTML={{ __html: openHours }} />
          {!expanded && distances[id] && (
            <p style={{ color: '#8a8a8a' }}>
              {t('Distance')}: {humanDistance(distances[id])}
            </p>
          )}
        </StoreColumn>
        <Carrot />
      </div>
      <div className="expanded-content">
        <StoreColumn dangerouslySetInnerHTML={{ __html: description }} />
        <StoreColumn className={secondStoreColumn}>
          <p>
            <strong>{t('Contact')}</strong>
          </p>
          <div
            dangerouslySetInnerHTML={{ __html: contactParser(contact) }}
            style={{ marginBottom: '24px' }}
          />
          {coordinates && (
            <>
              <p>
                <DirectionsSvg className="contact-icon" />
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/${coordinates.latitude},${coordinates.longitude}`}
                >
                  {t('Directions')}
                </a>
              </p>
              {distances[id] && <p>{humanDistance(distances[id])}</p>}
            </>
          )}
        </StoreColumn>
      </div>
    </StoreContainer>
  );
};

const StoreList = ({ stores, userLocation, setUserLocation, distances }) => (
  <StoreListContainer>
    <UserLocation setUserLocation={setUserLocation} />
    {stores &&
      stores.map((store, index) => (
        <Store
          key={index}
          storeNr={index + 1}
          store={store}
          distances={distances}
        />
      ))}
  </StoreListContainer>
);

export default StoreList;
