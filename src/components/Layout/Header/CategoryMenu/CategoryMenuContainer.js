import CategoryLink from '@jetshop/ui/CategoryLink';
import UIMenuContainer from '@jetshop/ui/Menu/MenuContainer';
import React from 'react';
import { styled } from 'linaria/react';
import SubMenuWrapper from './SubMenuWrapper';

const Wrapper = styled('div')`
  position: relative;
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
`;

const MainMenuItem = styled('li')`
  a {
    padding: 1rem;
    display: inline-block;
    color: #5c5c5c;
    text-decoration: none;
    &.active {
      color: #000;
      font-weight: bold;
    }
  }
`;

const CategoryMenuContainer = ({ queryData }) => {
  return (
    <UIMenuContainer>
      {props => (
        // When mousing outside the menu, close it
        <Wrapper onMouseLeave={props.clearActiveCategories}>
          <ul>
            {queryData && queryData.categories
              ? queryData.categories.map(cat => (
                  <CategoryMenuItem key={cat.id} cat={cat} props={props} />
                ))
              : null}
          </ul>

          <SubMenuWrapper
            pose={
              props.activeCategories.length > 0 &&
              props.activeCategories[0].subcategories.length > 0
                ? 'open'
                : 'closed'
            }
            activeCategory={props.activeCategories[0]}
            closeNav={props.clearActiveCategories}
          />
        </Wrapper>
      )}
    </UIMenuContainer>
  );
};

const CategoryMenuItem = ({ cat, props }) => {
  return (
    <MainMenuItem
      // When mousing over a menu item, set it as the active nav
      onMouseEnter={() => props.setActiveCategory(cat)}
    >
      <CategoryLink
        // When following a category link, close the menu
        onClick={props.clearActiveCategories}
        category={cat}
      >
        {cat.name}
      </CategoryLink>
    </MainMenuItem>
  );
};

export default CategoryMenuContainer;
