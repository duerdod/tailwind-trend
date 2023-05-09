import React, { Component } from 'react';
import { Query } from 'react-apollo';
import RecursiveTree from '@jetshop/ui/Menu/RecursiveTree';
import { styled } from 'linaria/react';
import { cx } from 'linaria';
import NavTreeQuery from './NavTreeQuery.gql';

const CategoryName = styled('span')`
  padding: 0.25rem 0.5rem;
  margin: 1px 0;
  display: inline-block;
  border-radius: 3px;
  border: 1px solid lightgray;
  cursor: pointer;
  &.hasSubcategories {
    &:before {
      margin-right: 0.5rem;
      font-weight: bold;
    }

    &.isActive {
      &:before {
        content: '-';
      }
    }
  }

  &.isActive {
    &:before {
      content: '+';
    }
  }
`;

const Categories = styled('div')`
  margin: 1rem;
`;

export default class NavTree extends Component {
  render() {
    return (
      <Categories>
        <Query variables={{ levels: 1 }} query={NavTreeQuery}>
          {({ loading, data, error }) => {
            if (loading) return 'loading…';
            if (error) return 'error';

            const { categories } = data;

            return categories.map(cat => (
              <RecursiveTree key={cat.id} category={cat}>
                {({
                  menuContainerProps,
                  fetchMore,
                  subcategories,
                  renderSubnav,
                  hasSubcategories,
                  level,
                  category
                }) => (
                  <>
                    <div
                      onMouseOver={fetchMore}
                      onClick={() =>
                        menuContainerProps.toggleActiveCategory(category)
                      }
                    >
                      <CategoryName
                        style={{ marginLeft: level * 1 + 'rem' }}
                        className={cx(
                          hasSubcategories && 'hasSubcategories',
                          menuContainerProps.isActiveCategory(category) &&
                            'isActive'
                        )}
                      >
                        {category.name}
                      </CategoryName>
                    </div>
                    {renderSubnav}
                  </>
                )}
              </RecursiveTree>
            ));
          }}
        </Query>
      </Categories>
    );
  }
}
