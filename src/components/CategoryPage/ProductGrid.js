import { useTracker } from '@jetshop/core/analytics/Analytics';
import { trackListEvent } from '@jetshop/core/analytics/tracking';
import React, { useEffect } from 'react';
import { styled } from 'linaria/react';
import { css, cx } from 'linaria';
import { ProductCard } from './ProductCard';
import { theme } from '../Theme';
import { Favourite } from '../ProductList/Favourite';

export const priceStyle = css`
  [data-flight-price] {
    display: flex;
  }
  .new-price {
    color: #eb0000;
    margin-right: 8px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .old-price {
    color: ${theme.colors.darkerGrey};
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const Wrapper = styled('ul')`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
  margin-right: -${theme.space[1]};
  margin-left: -${theme.space[1]};

  .product-card {
    line-height: 19px;
    min-width: 0;

    width: 50%;
    ${theme.above.md} {
      width: 33.333%;
    }
    ${theme.above.lg} {
      width: 25%;
    }
    a {
      margin: 0 0.5em 2em 0.5em;
    }
  }
`;

export function isAboveFold(index) {
  return index < 4;
}

export function ProductGrid({
  products,
  listName,
  category = '',
  loading,
  className,
  categoryPath,
  ...rest
}) {
  const track = useTracker();
  useEffect(() => {
    // Dont track anything if there are no products to render
    if (!products || products.length === 0) return;

    // Otherwise track a list view event
    track(trackListEvent({ listName, products, category }));
  }, [listName, products, track, category]);

  if (!products) return null;

  return (
    <Wrapper
      data-testid="product-grid"
      className={cx('product-grid', className, priceStyle)}
    >
      {products.map((product, index) => {
        return (
          <ProductCard
            key={index + ':' + product.articleNumber}
            product={product}
            style={{ opacity: loading ? 0.5 : 1 }}
            list={listName}
            categoryPath={categoryPath}
            loadImageEagerly={isAboveFold(index)}
            {...rest}
          >
            <Favourite
              product={product}
              style={{
                position: 'absolute',
                padding: '0.5em',
                fontSize: '1.5em',
                top: 0,
                right: '0.5em'
              }}
            />
          </ProductCard>
        );
      })}
    </Wrapper>
  );
}

export default ProductGrid;
