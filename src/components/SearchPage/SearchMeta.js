import React from 'react';
import { SearchMetaWrapper } from '@jetshop/ui/Search/SearchPage/SearchMeta';
import { PageOf } from '@jetshop/ui/Search/SearchPage/PageOf';
import t from '@jetshop/intl';
import { styled } from 'linaria/react';

const Matches = styled('div')`
  color: #999999;
  span {
    text-transform: uppercase;
    color: #141414;
    padding-right: 0.5rem;
  }
`;

const SearchMeta = ({ total, page, pages }) => {
  if (isNaN(pages)) {
    return null;
  }
  return (
    <SearchMetaWrapper>
      <Matches>
        <span>{t('Product Matches')}</span>
        {t('{total, plural, =1 {# item} other {# items}}', {
          total
        })}
      </Matches>
      <PageOf page={page} pages={pages} />
    </SearchMetaWrapper>
  );
};

export default SearchMeta;
