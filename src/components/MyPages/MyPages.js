import useAuth from '@jetshop/core/components/AuthContext/useAuth';
import t from '@jetshop/intl';
import React from 'react';
import { styled } from 'linaria/react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ReactComponent as Box } from '../../svg/Box.svg';
import { ReactComponent as Lock } from '../../svg/Lock.svg';
import { ReactComponent as Person } from '../../svg/Person.svg';
import BaseMaxWidth from '../Layout/MaxWidth';
import ChangePassword from './ChangePasswordPage';
import MyPagesSidebar from './MyPagesSidebar';
import MyPagesStartPage from './MyPagesStartPage';
import OrderListPage from './Orders/OrderListPage';
import ProfilePage from './ProfilePage';
import { useLocation } from 'react-router';
import { useShopConfig } from '@jetshop/core/hooks/useShopConfig';
import { Helmet } from 'react-helmet-async';

import { theme } from '../Theme';

const MaxWidth = styled(BaseMaxWidth)`
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
  ${theme.below.sm} {
    flex-direction: column;
    justify-content: flex-start;
    padding: 0;
    margin: 0;
  }

  .main-wrapper {
    width: 100%;
    padding-left: 2rem;
    padding-right: 2rem;

    ${theme.below.sm} {
      padding-left: 0rem;
      padding-right: 0rem;
    }

    header {
      font-weight: 600;
      h2 {
        margin-top: 0.75rem;
        font-size: 150%;
      }
    }

    .block {
      background: white;
      padding: 1.5rem;
      + .block {
        margin-top: 1.5rem;
      }

      .radio-container {
        margin: 0.5rem 0;
      }
      ul.row {
        display: flex;
        flex-direction: row;
      }
    }
    .half-block {
      width: calc(50% - 1.5rem);
      margin-left: 0.75rem;
      margin-right: 0.75rem;

      ${theme.above.md} {
        :first-child,
        :nth-child(2) {
          margin-top: 0;
        }
      }

      ${theme.below.md} {
        width: 100%;
      }
    }

    strong {
      font-weight: bold;
    }

    .profile-form {
      dt,
      dd {
        display: block;
        line-height: 1.5;
      }
      dd {
        margin-bottom: 1em;
      }
      dt {
        font-size: 0.75em;
      }
      dd {
        font-weight: 600;
      }
    }
  }
`;

const mainRoute = {
  component: MyPagesStartPage,
  exact: true,
  name: t('My Pages'),
  sideBarComponent: t('My Pages')
};

const subRoutes = [
  {
    path: '/orders',
    component: OrderListPage,
    sideBarComponent: (
      <>
        <Box />
        {t('My orders')}
      </>
    ),
    name: t('My orders')
  },
  {
    path: '/profile',
    component: ProfilePage,
    sideBarComponent: (
      <>
        <Person />
        {t('My profile')}
      </>
    ),
    name: t('My profile')
  },
  {
    path: '/change-password',
    component: ChangePassword,
    sideBarComponent: (
      <>
        <Lock />
        {t('Change Password')}
      </>
    ),
    name: t('Change Password')
  }
];

function MyPages() {
  const { loggedIn } = useAuth();
  const location = useLocation();
  const { routes } = useShopConfig();
  const myPagesPath = routes.myPages.path;

  const baseRoute = { ...mainRoute, path: myPagesPath };
  const myPagesRoutes = subRoutes.map(route => ({
    ...route,
    path: `${myPagesPath}${route.path}`
  }));

  if (!loggedIn) {
    return (
      <Redirect
        to={{
          ...location,
          pathname: routes.login.path
        }}
      />
    );
  }

  return (
    <MaxWidth>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>

      <MyPagesSidebar
        baseRoute={baseRoute}
        routes={routes}
        myPagesRoutes={myPagesRoutes}
      />
      <Route {...baseRoute} />
      <Switch>
        {myPagesRoutes.map(route => (
          <Route key={route.path} {...route} />
        ))}
      </Switch>
    </MaxWidth>
  );
}

export default MyPages;
