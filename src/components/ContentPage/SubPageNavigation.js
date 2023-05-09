import {
  DropdownMenu,
  DropdownMenuButton,
  DropdownMenuItem,
  DropdownMenuItems
} from '@jetshop/ui/DropdownMenu';
import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Carot } from '@jetshop/ui/svg/Carrot.svg';
import { css, cx } from 'linaria';
import { theme } from '../Theme';
import { useHistory, useLocation } from 'react-router';

const menu = css`
  width: 100%;

  @media (min-width: 50em) {
    display: none;
  }

  [data-flight-dropdown-button] {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: 0.75em;
    border: 1px solid #dedede;
    width: 100%;
    text-align: left;
    background: ${theme.colors.white};
    border-radius: 3px;
    outline: none;

    :focus {
      color: ${theme.colors.blue};
    }

    &[aria-expanded='true'] {
      border-radius: 3px 3px 0 0;
      border-bottom: 0;
      color: ${theme.colors.blue};

      .carot {
        transform: rotate(180deg);
      }
    }
  }

  [data-flight-dropdown-items] {
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    display: block;
    z-index: 2;
    outline: none;
    width: 100%;
    border: 1px solid #dedede;
    border-top: 0;
  }

  [data-flight-dropdown-item] {
    line-height: 1.5;
    border: none;
    cursor: pointer;
    white-space: normal;
    padding: 0.5em 1em;
    :hover {
      color: blue;
    }
  }

  [data-flight-dropdown-item] a {
    text-decoration: none;
    color: #000;
  }

  [data-flight-dropdown-item]:focus {
    font-weight: bold;
    background: #f2f2f2;
    outline: none;
    position: relative;
  }

  [data-flight-dropdown-item]:focus:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 2px;
    background-color: #2f80ed;
  }
`;

const links = css`
  display: flex;
  flex-direction: column;
`;

const link = css`
  color: #000;
  text-decoration: none;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const activeLink = css`
  font-weight: bold;
  color: #2f80ed;
`;

function getNavigationItemFromPage(page, level) {
  return {
    id: page.id,
    name: page.name,
    url: page.primaryRoute?.path,
    level
  };
}

function Item({ name, url, level }) {
  return (
    <div style={{ marginLeft: `${(level - 1) * 12}px` }}>
      <Link to={url}>{name}</Link>
    </div>
  );
}

function getNavigationItems(page) {
  const parent = page.parent ? getNavigationItemFromPage(page.parent, 1) : null;
  const siblings = page.parent
    ? page.parent.subPages.map(subPage => getNavigationItemFromPage(subPage, 2))
    : [];
  const subPages = page.subPages
    ? page.subPages.map(subPage =>
        getNavigationItemFromPage(subPage, parent ? 3 : 2)
      )
    : [];
  const currentPage = getNavigationItemFromPage(page, parent ? 2 : 1);

  if (!parent && !subPages?.length) return [];

  const items = [];

  if (parent) items.push(parent);
  if (siblings.length) {
    siblings.forEach(page => {
      items.push(page);
      if (page.id === currentPage.id) {
        items.push(...subPages);
      }
    });
  } else {
    items.push(currentPage, ...subPages);
  }

  return items;
}

export function shouldDisplayNavigation(page) {
  return Boolean(page.parent || page.subPages?.length);
}

export function DesktopNavigation({ page }) {
  const location = useLocation();
  const items = getNavigationItems(page);

  return (
    <div className={links}>
      {items.map(item => (
        <Link
          key={item.id}
          to={item.url}
          className={cx(link, location.pathname === item.url && activeLink)}
          style={{ marginLeft: `${(item.level - 1) * 12}px` }}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}

export function MobileNavigation({ page }) {
  const { push } = useHistory();
  const items = page ? getNavigationItems(page) : [];

  return (
    <DropdownMenu className={menu}>
      <DropdownMenuButton>
        <span>{page?.name}</span>
        <Carot className="carot" />
      </DropdownMenuButton>
      <DropdownMenuItems>
        {items.map(item => (
          <DropdownMenuItem key={item.id} onSelect={() => push(item.url)}>
            <Item {...item} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuItems>
    </DropdownMenu>
  );
}
