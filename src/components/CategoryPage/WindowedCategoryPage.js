import t from '@jetshop/intl';
import React, { useMemo } from 'react';
import { styled } from 'linaria/react';
import CategoryHeader from '../CategoryPage/CategoryHeader';
import MaxWidth from '../Layout/MaxWidth';
import CategoryHeaderLoadingState from './CategoryHeaderLoadingState';
import Filters from './Filters';
import ProductGridWindow from './ProductGridWindow';
import routeQuery from '../RouteQuery.gql';
import useInfinitePagination from '@jetshop/core/hooks/useInfinitePagination';
import { useLocation } from 'react-router';
import { TrendLink } from '../ui/Button';
import qs from 'qs';
import { theme } from '../Theme';
import { ContentRenderer } from '@jetshop/ui/ContentRenderer';

const Container = styled(MaxWidth)`
  padding-top: 2rem;
  ${theme.above.sm} {
    padding-top: 2rem;
  }
`;

const CategoryWrapper = styled('div')``;

const ProductNumber = styled('p')`
  text-transform: uppercase;
  font-size: 12px;
  color: #707070;
  letter-spacing: 0.5px;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
`;

const ButtonWrapper = styled('div')`
  width: 100%;
  max-width: 16rem;
  margin: 1rem auto;
`;

const WindowedCategory = ({ category, result }) => {
  const { previous, next, products } = useInfinitePagination({
    result,
    query: routeQuery
  });

  const location = useLocation();
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const routePath = category?.isDynamic ? null : result?.data?.route?.path;
  const categoryPath = useMemo(
    () => routePath && { path: routePath },
    [routePath]
  );

  if (!category) {
    return (
      <CategoryWrapper>
        <CategoryHeaderLoadingState />
      </CategoryWrapper>
    );
  }
  let renderHeader = true;
  if (category.data) {
    if (category.data.items.find(item => item.type === 'CategoryHeader')) {
      renderHeader = false;
    }
  }

  return (
    <CategoryWrapper>
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
            parents={result?.data?.route?.parents}
            breadcrumbs={result?.data?.route?.breadcrumbs}
          />
        )}
        <Container>
          <div>
            <Filters
              filters={category.products?.filters || []}
              sortOrders={category.products?.sortOrders || []}
              result={result}
            />
          </div>
          <ProductNumber>
            {t('{totalProducts} Products', {
              totalProducts: category.products?.totalResults
            })}
          </ProductNumber>
          {previous.hasProducts && (
            <ButtonWrapper>
              <TrendLink
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
              </TrendLink>
            </ButtonWrapper>
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
            <ButtonWrapper>
              <TrendLink
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
              </TrendLink>
            </ButtonWrapper>
          )}
        </Container>
      </>
    </CategoryWrapper>
  );
};

export default WindowedCategory;
