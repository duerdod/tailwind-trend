import React from 'react';
import { styled } from 'linaria/react';
import { cx } from 'linaria';
import { theme } from '../../Theme';

const List = styled('ul')`
  margin-left: 8px;
  margin-right: 0px;
  justify-content: flex-end;
  li.top-nav-list-item:last-of-type {
    padding-left: 8px;
    padding-right: 0px;
  }

  &.left {
    margin-right: 8px;
    margin-left: 0px;
    li.top-nav-list-item:first-of-type {
      padding-left: 0px;
      padding-right: 8px;
    }
  }

  margin-top: 0px;
  margin-bottom: 0px;
  padding: 0;
  display: flex;
  align-items: center;
  z-index: 999;
  li.top-nav-list-item {
    list-style: none;
    color: ${theme.colors.grey};
    display: block;
    padding: 0 8px;
    white-space: nowrap;
  }
  button {
    background: none;
    color: #666;
  }

  ${theme.below.md} {
    width: '50%';
    &.searchOpen {
      width: 'auto';
    }
  }
`;

export default function TopNav({ children, searchOpen, left, ...rest }) {
  return (
    <List
      className={cx(left ? 'left' : null, searchOpen && 'searchOpen')}
      {...rest}
    >
      {React.Children.map(
        children,
        item => item && <li className="top-nav-list-item">{item}</li>
      )}
    </List>
  );
}
