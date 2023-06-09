import React from 'react';
import loadable from '@loadable/component';
import LoadingPage from '../LoadingPage';

export default loadable(() => import('./WindowedCategoryPage'), {
  fallback: <LoadingPage />
});
