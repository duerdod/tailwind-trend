import { useTracker } from '@jetshop/core/analytics/Analytics';
import { trackListEvent } from '@jetshop/core/analytics/tracking';
import React, { useEffect } from 'react';
import { ProductCard } from './ProductCard';

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
    <div data-testid="product-grid" className={cx('product-grid', className)}>
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
          />
        );
      })}
    </div>
  );
}

export default ProductGrid;
