import StartPageRenderer from '@jetshop/ui/StartPageRenderer';
import React from 'react';
import { useQuery } from 'react-apollo';
import { styled } from 'linaria/react';
import LoadingPage from '../LoadingPage';
import StartPageCampaign from './Content/StartPageCampaign';
import StartPageCategories from './Content/StartPageCategories';
import StartPageHero from './Content/StartPageHero';
import StartPageHTMLContent from './Content/StartPageHTMLContent';
import StartPageProductGrid from './Content/StartPageProductGrid';
import startPageQuery from './StartPageQuery.gql';
import { StartPageCategoryItem } from './Content/StartPageCategories';

const startPageComponents = {
  HERO: StartPageHero,
  HTML: StartPageHTMLContent,
  CATEGORIES: StartPageCategories,
  CAMPAIGN: StartPageCampaign,
  PRODUCTGRID: StartPageProductGrid,
  CATEGORYITEM: StartPageCategoryItem
};

const StartPageWrapper = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StartPage = ({ startPageId }) => {
  const result = useQuery(startPageQuery, {
    variables: { startPageId: startPageId }
  });
  const { loading } = result;

  if (loading || !result?.data) return <LoadingPage />;

  return (
    <StartPageWrapper>
      <StartPageRenderer
        result={result}
        startPageComponents={startPageComponents}
        LoadingPage={LoadingPage}
      />
    </StartPageWrapper>
  );
};

export default StartPage;
