import React from 'react';
import CategoryLink from '@jetshop/ui/CategoryLink';
import getCategoriesByLevel from './__util__/getCategoriesByLevel';

const Categories = ({ categories, setActiveCategory }) => {
  const firstLevelCategories = getCategoriesByLevel(categories, 1);

  return firstLevelCategories.map(category => (
    <li key={category.name}>
      <CategoryLink
        onClick={() => setActiveCategory(category)}
        category={category}
      >
        {category.name}
      </CategoryLink>
    </li>
  ));
};

export default Categories;
