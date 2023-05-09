import t from '@jetshop/intl';
import React from 'react';
import { Query } from 'react-apollo';
import CategoryList from './CategoryList';
import { Header, Matches } from './SearchPage';
import SearchTerm from './SearchTerm';
import EmptySearchCategoriesQuery from './EmptySearchCategoriesQuery.gql';

const EmptySearchResults = ({ term, result }) => {
  return (
    <div>
      <Header>
        <Matches>
          {t.rich('No results for <Term />', {
            Term: () => <SearchTerm key="term">"{term}"</SearchTerm>
          })}
        </Matches>
      </Header>
      <Query
        query={EmptySearchCategoriesQuery}
        variables={{
          levels: 1,
          includeHidden: false
        }}
      >
        {({ data, loading }) =>
          !loading && data ? (
            <CategoryList
              title={t('Shop by category')}
              categories={data.categories}
            />
          ) : null
        }
      </Query>
    </div>
  );
};

export default EmptySearchResults;
