import t from '@jetshop/intl';
import React from 'react';
import { css } from 'linaria';
import { NavLink, Link } from 'react-router-dom';
import { theme } from '../Theme';
import { CustomerName } from './CustomerNameHeader';
import { MyPagesBreadcrumbs } from './MyPagesBreadcrumbs';
import { ReactComponent as LogOutIcon } from '../../svg/LogOut.svg';

const sidebar = css`
  ${theme.below.sm} {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 12px;
  }

  .nav-list {
    position: sticky;
    min-width: 223px;
    ${theme.below.sm} {
      min-width: 0px;
      width: 100%;
    }
  }

  h2 {
    font-weight: ${theme.fontWeights.semibold};
  }

  svg {
    margin-right: 12px;
    width: 1em;
    height: 1em;
  }

  .nav-list a,
  .nav-list button {
    padding: 0.5rem 0;
    background: transparent;
    width: 100%;
    display: flex;
    align-items: center;
    text-transform: none;
    text-decoration: none;
    color: ${theme.colors.black};
    margin-right: 1rem;
    border-bottom: 0.75px solid #dedede;
    height: 42px;

    &:hover {
      color: ${theme.colors.blue};
    }
    &.active {
      font-weight: 600;
    }

    ${theme.below.sm} {
      background: #ffffff;
      border: 1px solid #dedede;
      margin: 0.5em auto;
      padding: 0.5em;
    }
  }
  ${theme.below.sm} {
    margin: 1em 0.5em;
  }
`;

const MyPagesSidebar = ({ baseRoute, routes, myPagesRoutes }) => (
  <aside className={sidebar}>
    <MyPagesBreadcrumbs baseRoute={baseRoute} myPagesRoutes={myPagesRoutes} />
    <CustomerName />

    <ul className="nav-list">
      <h2>
        <NavLink exact to={baseRoute.path}>
          {baseRoute.sideBarComponent}
        </NavLink>
      </h2>
      {myPagesRoutes.map(route => (
        <li key={route.path}>
          <NavLink to={route.path}>{route.sideBarComponent}</NavLink>
        </li>
      ))}
      <li>
        <Link to={routes.logout.path}>
          <LogOutIcon />
          {t('Log Out')}
        </Link>
      </li>
    </ul>
  </aside>
);

export default MyPagesSidebar;
