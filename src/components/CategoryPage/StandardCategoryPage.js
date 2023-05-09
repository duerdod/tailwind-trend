import PaginationContext from '@jetshop/core/components/Pagination/PaginationContext';
import t from '@jetshop/intl';
import { PaginationBehaviour } from '@jetshop/ui/Pagination';
import { styled } from 'linaria/react';
import React from 'react';
import CategoryHeader from '../CategoryPage/CategoryHeader';
import MaxWidth from '../Layout/MaxWidth';
import { Pagination } from '../Pagination/Pagination';
import { theme } from '../Theme';
import CategoryHeaderLoadingState from './CategoryHeaderLoadingState';
import Filters from './Filters';
import ProductGrid from './ProductGrid';

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

const Category = ({ category, result }) => {
  if (!category) {
    return (
      <CategoryWrapper>
        <CategoryHeaderLoadingState />;
      </CategoryWrapper>
    );
  }

  return (
    <CategoryWrapper>
      <>
        <CategoryHeader
          category={category}
          parents={result?.data?.route?.parents}
          breadcrumbs={result?.data?.route?.breadcrumbs}
        />

        <Container>
          <Filters
            filters={category.products?.filters || []}
            sortOrders={category.products?.sortOrders || []}
            result={result}
          />
          <div>
            <ProductNumber>
              {t('{totalProducts} Products', {
                totalProducts: category.products?.totalResults
              })}
            </ProductNumber>

            <ProductGrid
              products={category.products.result}
              listName={category.name}
              categoryPath={category.isDynamic ? null : result?.data?.route}
              category={result?.data?.route?.breadcrumbs?.join('/') || ''}
              loading={result.loading}
              imageSizes={[1 / 2, 1 / 2, 1 / 3, 1 / 4]}
            />
          </div>

          <PaginationContext.Consumer>
            {props => (
              <PaginationBehaviour
                {...props}
                total={category.products?.totalResults}
              >
                {props => <Pagination {...props} />}
              </PaginationBehaviour>
            )}
          </PaginationContext.Consumer>
        </Container>
      </>
    </CategoryWrapper>
  );
};

export default Category;
