import { css } from 'linaria';
import { styled } from 'linaria/react';
import React from 'react';
import { theme } from '../../Theme';
import { ProductGrid } from '../../CategoryPage/ProductGrid';
import MaxWidth from '../../Layout/MaxWidth';
import { Title } from './Row';
import { usePropsOfType } from '@jetshop/ui/utils/usePropsOfType';

const Container = styled('div')`
  padding-top: 48px;
  padding-bottom: 28px;
  background-color: #f7f7f7;
  ${theme.below.sm} {
    padding-top: 32px;
    padding-bottom: 4px;
  }
`;

// The horizontal scroll is styled in a way that on any resolution smaller than 'lg', a part of the second/third item can be seen, indicating it is a horizontally scrollable container.
const productGrid = css`
  flex-wrap: nowrap !important;
  ${theme.below.md} {
    overflow-x: auto;
    .product-card {
      width: 300px;
      flex-shrink: 0;
      max-width: 40vw;
    }
  }
  ${theme.below.sm} {
    .product-card {
      max-width: 60vw;
      width: 340px;
    }
  }
  ${theme.below.xs} {
    .product-card {
      max-width: 75vw;
    }
  }

  @supports (display: grid) {
    grid-template-columns: repeat(4, 1fr);
    margin: 0;
    ${theme.below.md} {
      grid-template-columns: repeat(10, 1fr);
    }
  }
`;

const StartPageProductGrid = ({ header, ...rest }) => {
  const { filteredItems: products } = usePropsOfType(rest, 'product');

  return (
    <Container>
      <MaxWidth>
        <Title>{header.value}</Title>
        <ProductGrid
          imageSizes={[1 / 2, 1 / 2, 1 / 4]}
          list="Start page - Selected products"
          products={products}
          className={productGrid}
        />
      </MaxWidth>
    </Container>
  );
};

export default StartPageProductGrid;
