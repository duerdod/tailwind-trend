import React from 'react';
import pagesQuery from './PagesQuery.gql';
import ContentPageLink from '@jetshop/ui/ContentPageLink';
import t from '@jetshop/intl';
import StoreTitleQuery from './StoreTitleQuery.gql';
import { useQuery } from '@apollo/react-hooks';

function FooterLinks() {
  const { data } = useQuery(pagesQuery);
  const { data: storeTitleData, loading: storeTitleLoading } =
    useQuery(StoreTitleQuery);

  const pages = data?.pages;
  const storeTitle = storeTitleData?.startPage?.head.title;

  return pages ? (
    <section>
      {!storeTitleLoading && <h2>{storeTitle || t('Trend')}</h2>}
      <ul>
        {pages.map(page => (
          <li key={page.id}>
            <ContentPageLink page={page}>
              {page.subPages?.length ? '+ ' : null}
              {page.name}
            </ContentPageLink>
          </li>
        ))}
      </ul>
    </section>
  ) : null;
}

export default FooterLinks;
