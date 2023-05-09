import React from 'react';
import { styled } from 'linaria/react';
import CategoryLink from '@jetshop/ui/CategoryLink';
import Image from '@jetshop/ui/Image';
import { theme } from '../Theme';
import MaxWidth from '../Layout/MaxWidth';

const ScrollWrapper = styled('div')`
  margin: 0 -1.5rem;
  padding: 0 1.5rem 3rem;

  ${theme.below.md} {
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  ${theme.below.sm} {
    margin: 0 0;
    padding: 0 1rem 3rem;
  }
`;
const CategoriesWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  margin-right: -0.5rem;
  margin-left: -0.5rem;
  &:hover {
    > a > div {
      opacity: 0.8;
    }
  }
  ${theme.below.md} {
    > a {
      flex: 0 0 auto;
      width: 160px;
    }
  }
`;

const CategoryCard = styled('div')`
  display: flex;

  flex: 0 1 auto;
  align-items: stretch;
  justify-content: stretch;

  flex-direction: column;
  background: #ffffff;
  box-shadow: 4px 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 250ms ease-in-out;
  width: 100%;
  height: 100%;
  position: relative;
`;
const CardPaddingWrapper = styled(CategoryLink)`
  display: flex;

  flex: 0 1 auto;
  align-items: stretch;
  justify-content: stretch;

  width: 50%;
  ${theme.above.md} {
    width: ${(1 / 3) * 100}%;
  }
  ${theme.above.lg} {
    width: 20%;
  }

  padding-left: 0.5rem;
  padding-right: 0.5rem;
  max-width: 16rem;
  text-decoration: none;

  &:hover,
  &:focus,
  &:active {
    > div {
      opacity: 1 !important;
      box-shadow: 4px 8px 32px rgba(0, 0, 0, 0.1),
        4px 8px 40px rgba(0, 0, 0, 0.1);
      transform: translate(0, -2px);
      transition-duration: 100ms;
      z-index: 2;
    }
  }
`;

const CategoryName = styled('p')`
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  color: #000;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;

  height: 3rem;
  ${theme.above.md} {
    height: 5rem;
  }
`;

const CategoriesHeader = styled('h3')`
  margin-bottom: 1rem;
  font-size: 24px;
  ${theme.below.sm} {
    font-size: 18px;
    margin-left: 1rem;
  }
`;

const CategoryListWrapper = styled('div')`
  padding: 1rem 0;
`;

const Category = ({ category }) => {
  const categoryImageUrl = category?.images?.[0]?.url;
  return (
    <CardPaddingWrapper category={category}>
      <CategoryCard>
        {categoryImageUrl && (
          <Image
            src={categoryImageUrl}
            aspect="3:4"
            cover
            sizes="16rem"
            quality={80}
          />
        )}
        <CategoryName>{category.name}</CategoryName>
      </CategoryCard>
    </CardPaddingWrapper>
  );
};
const CategoryList = ({ title, categories, className = '' }) => {
  return (
    <MaxWidth className={className}>
      <CategoryListWrapper>
        <CategoriesHeader>{title}</CategoriesHeader>
        <ScrollWrapper>
          <CategoriesWrapper>
            {categories.map(category => (
              <Category key={category.name} category={category} />
            ))}
          </CategoriesWrapper>
        </ScrollWrapper>
      </CategoryListWrapper>
    </MaxWidth>
  );
};

export default CategoryList;
