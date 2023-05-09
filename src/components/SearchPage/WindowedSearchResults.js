import t from '@jetshop/intl';
import ProductGridWindow from '../CategoryPage/ProductGridWindow';
import React from 'react';
import { styled } from 'linaria/react';
import Filters from '../CategoryPage/Filters';
import MaxWidth from '../Layout/MaxWidth';
import searchQuery from './SearchQuery.gql';
import qs from 'qs';
import { TrendLink } from '../ui/Button';
import { useLocation } from 'react-router';
import useInfinitePagination from '@jetshop/core/hooks/useInfinitePagination';
import PaginationContext from '@jetshop/core/components/Pagination/PaginationContext';

const Header = styled('header')`
  background: white;
`;

const Matches = styled('div')`
  text-align: center;
  color: gray;
  padding: 1.5rem 0;
`;

const Container = styled(MaxWidth)`
  padding: 0 0.75rem;
`;

const ButtonWrapper = styled('div')`
  width: 100%;
  max-width: 16rem;
  margin: 1rem auto;
`;

const Wrapper = styled('div')``;

const WindowedSearchResults = ({ loading, ...props }) => {
  const { total, term, result } = props;

  const { currentPage } = React.useContext(PaginationContext);
  const search = result?.data?.search;
  const location = useLocation();
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });

  const { products, previous, next } = useInfinitePagination({
    result,
    query: searchQuery
  });

  return (
    <Wrapper>
      <Header>
        <Container>
          <Matches>
            {loading ? (
              currentPage === 1 ? (
                <div>
                  {t(`Loading search results for {term}…`, {
                    term
                  })}
                </div>
              ) : (
                <div>
                  {t(`Loading page {currentPage}…`, {
                    currentPage
                  })}
                </div>
              )
            ) : (
              <div>
                {t(
                  '{total, plural, =1 {# item} other {# items}} matching for "{term}"',
                  {
                    total,
                    term
                  }
                )}
              </div>
            )}
          </Matches>
        </Container>
      </Header>
      <Container>
        <div style={{ paddingTop: '1.5rem' }}>
          <Filters filters={search?.products?.filters || []} result={result} />
        </div>
        {previous.hasProducts && (
          <ButtonWrapper>
            <TrendLink
              secondary
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
          id="search"
          prevOffset={previous.offset}
          products={products}
          listName={'search'}
          loading={result.loading}
          imageSizes={[1 / 2, 1 / 2, 1 / 3, 1 / 4]}
        />
        {next.hasProducts && (
          <ButtonWrapper>
            <TrendLink
              secondary
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
    </Wrapper>
  );
};

export default WindowedSearchResults;
