import t from '@jetshop/intl';
import React, { useState } from 'react';
import { styled } from 'linaria/react';
import useGeolocation from '@jetshop/core/hooks/useGeolocation';

import TrendButton from '../ui/Button';
import { ReactComponent as LocationSvg } from '../../svg/Location.svg';
import { ReactComponent as CrossSvg } from '../../svg/Cross.svg';

const UserLocationContainer = styled('li')`
  position: relative;
  width: 100%;
  background: #fff;
  padding: 32px;

  > div {
    width: 100%;
    max-width: 260px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .ul-icon-close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 16px;

    background: transparent;
    box-shadow: none;
    border: 0;

    svg {
      stroke: #878787;
    }

    &:hover svg {
      stroke: #000;
    }
  }

  .ul-icon-circle {
    padding: 16px;
    background: #f2f2f2;
    border-radius: 50%;
  }

  h2 {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 18px;
    font-weight: 600;
    line-height: 23px;
    margin: 16px 0;
    text-align: center;
  }
`;

const UserLocation = ({ setUserLocation }) => {
  const [hide, setHide] = useState(false);

  const { getPosition, isAvailable, position } = useGeolocation({
    onSuccess: ({ coords: { latitude, longitude } }) =>
      setUserLocation({ latitude, longitude }),
    onError: err => console.log(err)
  });

  if (hide || !isAvailable || position) return null;

  return (
    <UserLocationContainer>
      <div>
        <button className="ul-icon-close" onClick={() => setHide(true)}>
          <CrossSvg />
        </button>
        <span className="ul-icon-circle">
          <LocationSvg />
        </span>
        <h2>{t('Find the closest store using your location')}</h2>
        <TrendButton onClick={getPosition}>{t('Share location')}</TrendButton>
      </div>
    </UserLocationContainer>
  );
};

export default UserLocation;
