import { styled } from 'linaria/react';

const stockColors = {
  inStock: '#27AE60',
  outOfStock: '#EB5757',
  notifyWhenBack: '#F2C94C'
};

const StockOrb = styled('span')`
  display: inline-block;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  transition: all 0.2s linear;
  background-color: ${({ status }) => stockColors[status]};
  margin-right: 0.5rem;
  border: 1px solid transparent;
  &.inStock {
    background-color: ${stockColors['inStock']};
  }
  &.outOfStock {
    background-color: ${stockColors['outOfStock']};
  }
  &.notifyWhenBack {
    background-color: ${stockColors['notifyWhenBack']};
  }
  &.missingVariant {
    background-color: transparent;
    border-color: ${stockColors['outOfStock']};
  }
`;

export default StockOrb;
