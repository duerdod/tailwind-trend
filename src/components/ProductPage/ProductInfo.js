import ProductSpecifications from '@jetshop/ui/ProductSpecifications/ProductSpecifications';
import React from 'react';
import { styled } from 'linaria/react';
import t from '@jetshop/intl';
import { theme } from '../Theme';

const Description = styled('article')`
  margin-bottom: 42px;
  color: #707070;
`;

export const SectionHeading = styled('h2')`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 0.25em;
`;

export const ProductSection = styled('section')`
  line-height: 1.5;

  width: 100%;
  padding-bottom: 3rem;

  ${theme.below.md} {
    margin: 0;
  }

  ${theme.above.md} {
    width: calc(50% - 16px);
  }

  ${theme.above.lg} {
    :nth-of-type(odd) {
      width: calc(60% - 24px);
    }
    :nth-of-type(even) {
      width: calc(40% - 24px);
    }
  }
  ul.payment-options-list {
    font-size: 16px;
    font-weight: 600;
  }
`;

const ProductInfo = ({ product }) => {
  return (
    <>
      {product.description && (
        <ProductSection>
          <SectionHeading>{t('Product description')}</SectionHeading>
          <Description
            dangerouslySetInnerHTML={{
              __html: product.description
            }}
          />
        </ProductSection>
      )}
      {product.customFields?.length > 0 && (
        <ProductSection>
          <SectionHeading>{t('Specifications')}</SectionHeading>
          <ProductSpecifications fields={product.customFields} />
        </ProductSection>
      )}
    </>
  );
};

export default ProductInfo;
