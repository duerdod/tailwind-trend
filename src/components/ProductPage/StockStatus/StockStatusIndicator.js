import PropTypes from 'prop-types';
import React from 'react';
import StockOrb from './StockOrb';
import { styled } from 'linaria/react';

const StockStatusWrapper = styled('p')`
  margin-top: 16px;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

const StockStatusIndicator = ({ status, text, ...props }) => {
  return (
    <StockStatusWrapper {...props}>
      <StockOrb status={status} />
      <span>{text}</span>
    </StockStatusWrapper>
  );
};

StockStatusIndicator.propTypes = {
  status: PropTypes.oneOf(['inStock', 'outOfStock', 'notifyWhenBack']),
  text: PropTypes.string
};

export default StockStatusIndicator;
