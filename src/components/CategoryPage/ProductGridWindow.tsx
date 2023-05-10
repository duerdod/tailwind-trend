import { useTracker } from '@jetshop/core/analytics/Analytics';
import { trackListEvent } from '@jetshop/core/analytics/tracking';
import React, { useEffect, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { isAboveFold } from './ProductGrid';
import { WindowGrid } from '../../ui/WindowGrid';
import { Product } from '@jetshop/core/types';

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
}: {
  id: any;
  products: Product[];
  listName: string;
  loading: boolean;
  className?: string;
  prevOffset: number;
  itemsPerRow?: number | number[];
  categoryPath?: any;
  category: string;
  imageSizes?: any;
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
    () => ({ item: product, style, innerRef }) => (
      <div style={style} ref={innerRef}>
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
      className="flex flex-row flex-wrap m-[0_,-0,5em_,1em]"
      component={renderProduct}
    />
  );
}

export default ProductGridWindow;
