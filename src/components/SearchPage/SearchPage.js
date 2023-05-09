import React, { useEffect } from 'react';
import t from '@jetshop/intl';
import { trackPageEvent } from '@jetshop/core/analytics/tracking';
import { useTracker } from '@jetshop/core/analytics/Analytics';
import SearchPageBehaviour from '@jetshop/ui/Search/SearchPage/SearchPageBehaviour';
import SearchResults from './SearchResults';
import WindowedSearchResults from './WindowedSearchResults';
import EmptySearchResults from './EmptySearchResults';
import { styled } from 'linaria/react';
import MaxWidth from '../Layout/MaxWidth';
import SearchQuery from './SearchQuery.gql';
import { useLocation } from 'react-router';
import qs from 'qs';

export const Header = styled('header')`
  background: white;
`;

export const Matches = styled('div')`
  text-align: center;
  color: gray;
  padding: 1.5rem 0;
`;

export const Container = styled(MaxWidth)`
  padding: 0 0.75rem;
`;

const renderResults = (searchProps, standardPagination) =>
  searchProps.total > 0 || searchProps.loading ? (
    standardPagination ? (
      <SearchResults {...searchProps} />
    ) : (
      <WindowedSearchResults {...searchProps} />
    )
  ) : (
    <EmptySearchResults term={searchProps.term} result={searchProps.result} />
  );

const SearchPage = () => {
  const track = useTracker();
  const location = useLocation();
  const { pathname, search } = location;

  const standardPagination =
    qs.parse(search, { ignoreQueryPrefix: true }).standardPagination === 'true';

  useEffect(() => {
    track(trackPageEvent({ pathname: `${pathname}${search}` }));
  }, [track, pathname, search]);

  return (
    <>
      <SearchPageBehaviour searchQuery={SearchQuery} location={location}>
        {({ error, ...searchProps }) =>
          error ? (
            <div error={error}>{t('An error occured. Please try again!')}</div>
          ) : (
            renderResults(searchProps, standardPagination)
          )
        }
      </SearchPageBehaviour>
    </>
  );
};

export default SearchPage;
