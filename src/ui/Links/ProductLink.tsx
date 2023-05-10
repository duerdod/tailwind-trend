import * as React from 'react';
import { useTracker } from '@jetshop/core/analytics/Analytics';
import { trackProductEvent } from '@jetshop/core/analytics/tracking';
import useWarningInDev from '@jetshop/core/hooks/useWarningInDev';
import { Product, Route } from '@jetshop/core/types';
import { useLocation, Link, LinkProps } from 'react-router-dom';
import { useRoutePreload } from '@jetshop/core/hooks/useRoutePreload';
import { useHoverIntent } from './useHoverIntent';
import { breadcrumbsWithoutProduct } from '@jetshop/core/analytics/utils/breadcrumbsWithoutProduct';
import { useShopConfig } from '@jetshop/core/hooks/useShopConfig';

export interface ProductLinkProps extends Partial<LinkProps> {
  /** The full Product returned from the query */
  product: Product;
  /** Used for product tracking */
  index?: number;
  /** Used for product tracking */
  list?: string;
  /** If passed, used to construct the link path. Otherwise use canonical category. */
  categoryPath?: Route;
  /**  Optional string to be used as the search string. */
  search?: string;
  /**  Optional string to be used as the hash string. */
  hash?: string;
  className?: string;
}

export function getPathWithTrailingSlash(path: string) {
  if (path.endsWith('/')) {
    return path;
  } else return path + '/';
}

const ProductLink: React.FC<ProductLinkProps> = ({
  product,
  index,
  list,
  children,
  onClick,
  categoryPath,
  search,
  hash,
  ...rest
}) => {
  const track = useTracker();
  const { preload } = useRoutePreload();
  useWarningInDev(!product, `You must pass a product to ProductLink`);
  const location = useLocation();
  let pathname = '/';
  const { usePrimaryRouteForProducts } = useShopConfig();
  const productPreload = () => {
    preload({
      pathname,
      routeType: 'Product'
    });
  };

  const [, intentRef] = useHoverIntent({
    onHover: () => {
      productPreload();
    }
  });

  if (!product || !product.primaryRoute) {
    return <>{children ? children : product.name}</>;
  }

  const { primaryRoute, id } = product;
  pathname =
    categoryPath && !usePrimaryRouteForProducts
      ? getPathWithTrailingSlash(categoryPath.path) + primaryRoute.slug
      : primaryRoute.path;

  return (
    <Link
      {...rest}
      onClick={event => {
        track(
          trackProductEvent({
            action: 'click',
            product,
            list,
            index,
            category: breadcrumbsWithoutProduct(
              categoryPath?.breadcrumbs || product.primaryRoute?.breadcrumbs
            )
          })
        );
        onClick && onClick(event);
      }}
      to={{
        pathname,
        state: {
          type: 'Product',
          id,
          product: {
            ...product,
            inPackages: [],
            variants: {
              options: [],
              values: []
            },
            stockStatus: {}
          },
          list: list || (location.state ? location.state.list : null)
        },
        search,
        hash
      }}
      innerRef={intentRef as any}
      onTouchStart={productPreload}
    >
      {children ? children : product.name}
    </Link>
  );
};

export { ProductLink };
