import React, { Component } from 'react';
import CategoryLink from '@jetshop/ui/CategoryLink';
import { styled } from 'linaria/react';
import { theme } from '../../Theme';

const SubCategoryContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  border-bottom: 1px solid #e8e8e8;
  padding: ${theme.space[1]};
  ${theme.below.sm} {
    flex-direction: column;
    border: none;
    padding: none;
  }
`;

const SubCategoryLink = styled(CategoryLink)``;

const SubCategoryHeader = styled('h3')`
  font-size: 14px;
  font-weight: 600;
`;

const SubCategory = styled('h4')`
  font-size: 14px;
  font-weight: normal;
  color: #5c5c5c;
  width: 33%;
  margin: 0px;
  margin-bottom: 10px;
`;

const Categories = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 10px;
`;

const SubCategories = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export default class SubCategoryNav extends Component {
  renderSubCategories = categoryHeader => {
    const { categories } = this.props;
    const subCategories = categories.filter(
      category => category.parentId === categoryHeader.id
    );
    return (
      <SubCategories>
        {subCategories.map(subCategory => {
          return (
            <SubCategoryLink key={subCategory.url} category={subCategory}>
              <SubCategory>{subCategory.name}</SubCategory>
            </SubCategoryLink>
          );
        })}
      </SubCategories>
    );
  };

  render() {
    const { categories, activeCategory } = this.props;
    const categoryHeaders = categories.filter(
      category => category.parentId === activeCategory.id
    );

    if (categoryHeaders.length > 1) {
      return (
        <SubCategoryContainer>
          {categoryHeaders.map(categoryHeader => {
            return (
              <Categories key={categoryHeader.id}>
                <SubCategoryLink category={categoryHeader}>
                  <SubCategoryHeader>{categoryHeader.name}</SubCategoryHeader>
                </SubCategoryLink>
                {this.renderSubCategories(categoryHeader)}
              </Categories>
            );
          })}
        </SubCategoryContainer>
      );
    } else return null;
  }
}
