import t from '@jetshop/intl';
import React from 'react';
import { styled } from 'linaria/react';
import { Container as BaseContainer } from './styledComponents';
import { ProductGrid } from '../CategoryPage/ProductGrid';

import { theme } from '../Theme';

const Container = styled(BaseContainer)`
  background: transparent;
  /* padding: 0; */

  h2 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 0.75em;
  }

  .product-grid {
    width: 100%;
    .product-card {
      width: 16.667%;
    }
    /* Let products overflow on smaller devices */
    ${theme.below.md} {
      overflow-x: auto;
      display: flex;
      flex-wrap: nowrap;
      .product-card {
        min-width: 34%;
        margin: 0 0.5em;
      }
    }
  }
  .product-card {
    font-size: 0.875em;
  }
`;

const RelatedProducts = React.memo(({ relatedProducts, loading }) => {
  if (!relatedProducts || relatedProducts.length === 0) return null;

  return (
    <Container>
      <h2>{t('Related products')}</h2>
      <ProductGrid
        listName="related-products"
        products={relatedProducts}
        loading={loading}
        imageSizes={[1 / 3, 1 / 3, 1 / 6]}
      />
    </Container>
  );
});

export { RelatedProducts };
