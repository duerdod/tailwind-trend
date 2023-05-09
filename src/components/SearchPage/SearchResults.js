import PaginationContext from '@jetshop/core/components/Pagination/PaginationContext';
import t from '@jetshop/intl';
import { PaginationBehaviour } from '@jetshop/ui/Pagination';
import ProductGrid from '../CategoryPage/ProductGrid';
import React, { Fragment } from 'react';
import { styled } from 'linaria/react';
import Filter from '../CategoryPage/Filters';
import MaxWidth from '../Layout/MaxWidth';
import SearchMeta from './SearchMeta';
import { Pagination } from '../Pagination/Pagination';

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

const Wrapper = styled('div')``;

const SearchResults = ({ loading, ...props }) => {
  const { total, term, result } = props;
  const products = result?.data?.search?.products?.result;

  return (
    <PaginationContext.Consumer>
      {({ currentPage, goToPage, perPage }) => (
        <PaginationBehaviour goToPage={goToPage} total={props.total}>
          {paginatedProps => (
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
              {(products || currentPage > 1) && (
                <Container>
                  {props.filters && (
                    <div style={{ paddingTop: '1.5rem' }}>
                      <Filter filters={props.filters} />
                    </div>
                  )}
                  <PaginationBehaviour
                    currentPage={currentPage}
                    goToPage={goToPage}
                    perPage={perPage}
                    total={props.total}
                  >
                    {paginationProps => (
                      <Fragment>
                        <SearchMeta
                          total={props.total}
                          page={currentPage}
                          pages={paginationProps.totalPages}
                        />
                        <section>
                          <ProductGrid
                            listName="search"
                            products={products}
                            loading={loading}
                          />
                        </section>

                        <Pagination {...paginationProps} />
                      </Fragment>
                    )}
                  </PaginationBehaviour>
                </Container>
              )}
            </Wrapper>
          )}
        </PaginationBehaviour>
      )}
    </PaginationContext.Consumer>
  );
};

export default SearchResults;
