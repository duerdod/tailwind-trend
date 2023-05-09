import { default as Breadcrumbs } from '@jetshop/ui/Breadcrumbs';
import Image from '@jetshop/ui/Image/Image';
import React from 'react';
import { styled } from 'linaria/react';
import { css } from 'linaria';
import MaxWidth from '../Layout/MaxWidth';
import { theme } from '../Theme';

export const CategoryHeaderWrapper = styled(MaxWidth)`
  background-color: ${theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  ${theme.below.xl} {
    max-width: 100%;
    width: 100%;
    padding: 0px;
  }
`;

const CategoryImageWrapper = styled('div')`
  height: 320px;
  width: 100%;
  ::after {
    display: block;
    position: relative;
    background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.195) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    width: 100%;
    content: '';
    margin-top: -320px;
    height: 320px;
  }
  ${theme.below.md} {
    height: 217px;
    ::after {
      margin-top: -217px;
      height: 217px;
    }
  }
`;

export const NoImageWrapper = styled('div')`
  margin-top: 3.5rem;
  padding: 10px;
`;

const CategoryName = styled('h1')`
  font-weight: 600;
  line-height: normal;
  font-size: 40px;
  margin-bottom: 10px;
  ${theme.below.md} {
    font-size: 30px;
  }
`;

const CategoryContent = styled('div')`
  max-width: 540px;
  font-weight: 300;
  line-height: 26px;
  font-size: 18px;
`;

const StyledBreadcrumbs = styled(Breadcrumbs)`
  margin-bottom: 8px;
`;

const headerImageStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  ${StyledBreadcrumbs} {
    a,
    li {
      color: white;
    }
  }
`;

export const Inner = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Content = ({ category, breadcrumbProps, content }) => (
  <Inner>
    <StyledBreadcrumbs {...breadcrumbProps} />
    <CategoryName data-testid="page-header">{category.name}</CategoryName>
    <CategoryContent
      data-testid="category-description"
      dangerouslySetInnerHTML={{
        __html: content?.value || category.content
      }}
    />
  </Inner>
);

const CategoryHeader = ({
  category,
  parents,
  imageSrc,
  breadcrumbs,
  content
}) => {
  const breadcrumbProps = {
    breadcrumbs,
    parents
  };
  const isImageBackground =
    imageSrc || (category.images && category.images.length > 0);
  return (
    <CategoryHeaderWrapper>
      {isImageBackground ? (
        <CategoryImageWrapper>
          <Image
            src={imageSrc?.value || category.images}
            fillAvailableSpace
            cover
            quality={80}
            className={headerImageStyles}
            critical={true}
            sizes={[1, 1, 1, 1, 1216]}
          >
            <Content
              category={category}
              breadcrumbProps={breadcrumbProps}
              content={content}
            />
          </Image>
        </CategoryImageWrapper>
      ) : (
        <NoImageWrapper>
          <Content
            category={category}
            breadcrumbProps={breadcrumbProps}
            content={content}
          />
        </NoImageWrapper>
      )}
    </CategoryHeaderWrapper>
  );
};

export default CategoryHeader;
