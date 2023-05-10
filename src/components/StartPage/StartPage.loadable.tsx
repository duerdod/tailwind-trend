import React from 'react';
import loadable from '@loadable/component';
import LoadingPage from '../LoadingPage';

export default loadable(() => import('./StartPage'), {
  fallback: <LoadingPage />
});
