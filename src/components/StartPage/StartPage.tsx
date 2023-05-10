import React from 'react';
import { ContentRenderer } from '../../ui/ContentRenderer';
import { useQuery } from 'react-apollo';
import { Hero } from './Content/Hero';
import LoadingPage from '../LoadingPage';
import StartPageQuery from './StartPageQuery.gql';
import { Campaigns } from './Content/Campaigns';

function StartPage() {
  const result = useQuery(StartPageQuery);
  const { loading } = result;

  if (loading || !result?.data) return <LoadingPage />;
  return (
    <ContentRenderer
      items={result?.data?.startPage?.data.items}
      components={{ HERO: Hero }}
    />
  );
}

export default StartPage;
