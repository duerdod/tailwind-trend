import Breadcrumbs from '@jetshop/ui/Breadcrumbs';
import React from 'react';
import { Route } from 'react-router-dom';

export function MyPagesBreadcrumbs({ baseRoute, myPagesRoutes }) {
  const baseRouteParent = [
    {
      object: {
        breadcrumbText: baseRoute.name
      },
      path: baseRoute.path
    }
  ];
  return (
    <Route>
      {({ location }) => {
        const route = myPagesRoutes.find(
          route => route.path === location.pathname
        );
        return (
          <Breadcrumbs
            breadcrumbText={route ? route.name : baseRoute.name}
            parents={route && baseRouteParent}
          />
        );
      }}
    </Route>
  );
}
