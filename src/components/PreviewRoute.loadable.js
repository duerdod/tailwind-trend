import loadable from '@loadable/component';

export default loadable(
  () => import('@jetshop/core/components/DynamicRoute/PreviewRoute'),
  {
    fallback: () => null
  }
);
