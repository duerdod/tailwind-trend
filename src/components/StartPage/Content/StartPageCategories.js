import React from 'react';
import { styled } from 'linaria/react';
import Image from '@jetshop/ui/Image/Image';
import CategoryLink from '@jetshop/ui/CategoryLink';
import { theme } from '../../Theme';
import Row from './Row';

const ItemTitle = styled('h2')`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  color: #000;
  padding-top: 10px;
  padding-bottom: 10px;
  transition: 200ms;
  ${theme.below.md} {
    font-size: 16px;
  }
`;

const ImageContainer = styled('div')`
  transition: 200ms;
  filter: grayscale(1);
`;

const CategoryItem = styled(CategoryLink)`
  margin-left: 12px;
  margin-right: 12px;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  flex: 1;

  ${ItemTitle} {
    background-color: white;
  }
  &:hover {
    ${ItemTitle} {
      background-color: ${theme.colors.blue};
      color: white;
    }
    ${ImageContainer} {
      filter: grayscale(0);
    }
  }

  ${theme.above.xl} {
    max-width: 250px;
  }

  ${theme.below.xl} {
    flex: 1 0 20%;
  }

  ${theme.below.lg} {
    flex: 1 0 25%;
  }

  ${theme.below.md} {
    flex: 1 0 35%;
  }

  ${theme.below.sm} {
    flex: 1 0 60%;
  }
`;

const StartPageCategories = ({ header, children }) => {
  return <Row header={header}>{children}</Row>;
};

export const StartPageCategoryItem = ({ category, categoryImage, styles }) => {
  if (!category) return null;
  const cat = category.value;
  const img = categoryImage.value;

  return (
    cat && (
      <CategoryItem category={cat}>
        <ImageContainer>
          <Image
            aspect={'3:4'}
            sizes={[1 / 2, 1 / 3, 1 / 4]}
            cover={true}
            src={img || cat.images[cat.images.length - 1]?.url}
          />
        </ImageContainer>
        <ItemTitle>{cat.name}</ItemTitle>
      </CategoryItem>
    )
  );
};

export default StartPageCategories;
