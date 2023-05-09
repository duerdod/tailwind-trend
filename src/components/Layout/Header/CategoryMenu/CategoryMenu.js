import React from 'react';
import CategoryMenuContainer from './CategoryMenuContainer';
import { styled } from 'linaria/react';

const Nav = styled('nav')`
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  button {
    background: none;
    color: #666;
  }

  .menu-container {
    margin-top: 0;
  }
`;

export function CategoryMenu({ data }) {
  return (
    <Nav>
      <div key={'menuContainerPosed'} className="menu-container">
        <CategoryMenuContainer queryData={data} />
      </div>
    </Nav>
  );
}
