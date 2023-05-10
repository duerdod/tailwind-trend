import t from '@jetshop/intl';
import React, { useMemo } from 'react';
import { CategoryHeader } from './CategoryHeader';
// import Filters from './Filters';
import ProductGridWindow from './ProductGridWindow';
import routeQuery from '../RouteQuery.gql';
import useInfinitePagination from '@jetshop/core/hooks/useInfinitePagination';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import qs from 'qs';
import { ContentRenderer } from '../../ui/ContentRenderer';

const WindowedCategory = ({ category, result }) => {
  const { previous, next, products } = useInfinitePagination({
    result,
    query: routeQuery
  });

  const location = useLocation();
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const routePath = category?.isDynamic ? null : result?.data?.route?.path;
  const categoryPath = useMemo(() => routePath && { path: routePath }, [
    routePath
  ]);

  if (!category) {
    return (
      <div>
        <span>loading</span>
      </div>
    );
  }
  let renderHeader = true;
  if (category.data) {
    if (category.data.items.find(item => item.type === 'CategoryHeader')) {
      renderHeader = false;
    }
  }

  return (
    <div>
      {category.data && (
        <ContentRenderer
          items={category.data.items}
          components={{
            CATEGORYHEADER: props => (
              <div style={{ paddingBottom: '2rem' }}>
                <CategoryHeader
                  category={category}
                  parents={result?.data?.route?.parents}
                  {...props}
                  breadcrumbs={
                    props.breadcrumbs?.value
                      ? result?.data?.route?.breadcrumbs
                      : []
                  }
                />
              </div>
            )
          }}
        />
      )}
      <>
        {renderHeader && (
          <CategoryHeader
            category={category}
            breadcrumbs={result?.data?.route?.breadcrumbs}
          />
        )}
        <div className="sm:pt-8">
          <div>
            {/* <Filters
              filters={category.products?.filters || []}
              sortOrders={category.products?.sortOrders || []}
              result={result}
            /> */}
          </div>
          <p className="uppercase mt-4 mb-2 text-xs">
            {t('{totalProducts} Products', {
              totalProducts: category.products?.totalResults
            })}
          </p>
          {previous.hasProducts && (
            <div className="w-full max-w-xs my-4 mx-auto">
              <Link
                className="secondary"
                onClick={e => {
                  e.preventDefault();
                  previous.fetchProducts();
                }}
                to={{
                  ...location,
                  search: qs.stringify({
                    ...params,
                    page: previous.page
                  })
                }}
              >
                {t('Show more')}
              </Link>
            </div>
          )}
          <ProductGridWindow
            id="category"
            prevOffset={previous.offset}
            products={products}
            listName={category.name}
            categoryPath={categoryPath}
            category={result?.data?.route?.breadcrumbs?.join('/') || ''}
            loading={result.loading}
            imageSizes={[1 / 2, 1 / 2, 1 / 3, 1 / 4]}
          />
          {next.hasProducts && (
            <div className="w-full max-w-xs my-4 mx-auto">
              <Link
                className="secondary"
                onClick={e => {
                  e.preventDefault();
                  next.fetchProducts();
                }}
                to={{
                  ...location,
                  search: qs.stringify({
                    ...params,
                    page: next.page
                  })
                }}
              >
                {t('Show more')}
              </Link>
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default WindowedCategory;
