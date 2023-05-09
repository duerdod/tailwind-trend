import { useTracker } from '@jetshop/core/analytics/Analytics';
import { trackListEvent } from '@jetshop/core/analytics/tracking';
import React, { useEffect, useMemo } from 'react';
import { css, cx } from 'linaria';
import { ProductCard } from './ProductCard';
import { isAboveFold, priceStyle } from './ProductGrid';
import { WindowGrid } from '@jetshop/ui/WindowGrid';

const container = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 -0.5em 1em;
`;

const defaultStyle = css`
  flex: 0 0 auto;
  width: 25%;
`;

function ProductGridWindow({
  id,
  products,
  listName,
  loading,
  className,
  prevOffset,
  itemsPerRow,
  categoryPath,
  category = '',
  ...rest
}) {
  // Track product listing
  const track = useTracker();
  useEffect(() => {
    // Dont track anything if there are no products to render
    if (!products || products.length === 0) return;

    // Otherwise track a list view event
    track(trackListEvent({ listName, products, category }));
  }, [listName, products, track, category]);

  const renderProduct = useMemo(
    () =>
      ({ item: product, style, innerRef }) =>
        (
          <div className={defaultStyle} style={style} ref={innerRef}>
            <ProductCard
              key={product.articleNumber}
              product={product}
              as="div"
              categoryPath={categoryPath}
              loadImageEagerly={isAboveFold(product.index)}
            />
          </div>
        ),
    [categoryPath]
  );

  const items = useMemo(() => {
    return products.map((product, index) => ({ ...product, index }));
  }, [products]);

  return (
    <WindowGrid
      id={id}
      itemsPerRow={[2, null, 3, 4]}
      items={items}
      prevOffset={prevOffset}
      className={cx(container, priceStyle)}
      component={renderProduct}
    />
  );
}

export default ProductGridWindow;
