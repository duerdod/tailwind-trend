import React from 'react';
import { useLocation } from 'react-router';
import qs from 'qs';
import loadable from '@loadable/component';
import LoadingPage from '../LoadingPage';

export const LoadableStandardCategoryPage = loadable(
  () => import('./StandardCategoryPage'),
  {
    fallback: <LoadingPage />
  }
);

export const LoadableWindowedCategoryPage = loadable(
  () => import('./WindowedCategoryPage'),
  {
    fallback: <LoadingPage />
  }
);

const CategoryPage = props => {
  const location = useLocation();
  const { search } = location;

  const searchObject = qs.parse(search, { ignoreQueryPrefix: true });
  const standardPagination = searchObject.standardPagination === 'true';

  // Comment out the one you're not using
  if (standardPagination) {
    return <LoadableStandardCategoryPage {...props} />;
  } else {
    return <LoadableWindowedCategoryPage {...props} />;
  }
};

export default CategoryPage;
