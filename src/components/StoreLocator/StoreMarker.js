import React from 'react';
import { styled } from 'linaria/react';
import { cx } from 'linaria';
import { ReactComponent as MapPinSvg } from '../../svg/MapPin.svg';

import { theme } from '../Theme';

const MarkerContainer = styled('div')`
  position: relative;
  width: 24px;
  height: 29px;
  margin-right: 12px;

  svg {
    fill: ${theme.colors.white};

    width: 100%;
    height: 100%;
  }
  &.active {
    svg {
      fill: ${theme.colors.blue};
    }

    span {
      color: ${theme.colors.white};
    }
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 3px;
    right: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    font-family: 'Source Sans Pro', sans-serif;
    font-size: 16px;
    line-height: 1;

    color: ${theme.colors.blue};
  }
`;

export const StoreMarker = ({ nr, active, large, ...rest }) => (
  <MarkerContainer className={cx(active ? 'active' : null)} {...rest}>
    <MapPinSvg />
    <span>{nr}</span>
  </MarkerContainer>
);
