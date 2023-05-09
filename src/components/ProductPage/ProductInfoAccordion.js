import t from '@jetshop/intl';
import Accordion from '@jetshop/ui/Accordion/Accordion';
import ProductSpecifications from '@jetshop/ui/ProductSpecifications/ProductSpecifications';
import React, { Fragment } from 'react';
import { styled } from 'linaria/react';
import {
  ProductSection as UIProductSection,
  SectionHeading
} from './ProductInfo';

const Description = styled('article')`
  line-height: 25px;
`;

const ProductSection = styled(UIProductSection)`
  border-bottom: 1px solid #e8e8e8;
  padding: 1rem 0;
  margin: 1rem 0;
  font-size: 0.875rem;
  ${SectionHeading} {
    display: flex;
    justify-items: space-between;
    align-items: center;
    margin-bottom: 0;
    + * > :first-child {
      margin-top: 1rem;
    }
  }
`;

const IndicatorIcon = styled('span')`
  margin-left: auto;
  font-size: 1.25rem;
`;
const AccordionIndicator = ({ isOpen }) => (
  <IndicatorIcon>{isOpen ? '-' : '+'}</IndicatorIcon>
);

const ProductInfoAccordion = ({ product }) => (
  <Accordion single>
    {({ openIndexes, handleClick, AccordionContent }) => (
      <Fragment>
        <ProductSection>
          <SectionHeading onClick={() => handleClick(0)}>
            <span>{t('Product description')}</span>
            <AccordionIndicator isOpen={openIndexes.includes(0)} />
          </SectionHeading>
          <AccordionContent isOpen={openIndexes.includes(0)}>
            <Description
              dangerouslySetInnerHTML={{
                __html: product.description
              }}
            />
          </AccordionContent>
        </ProductSection>
        <ProductSection>
          <SectionHeading onClick={() => handleClick(1)}>
            <span>{t('Specifications')}</span>
            <AccordionIndicator isOpen={openIndexes.includes(1)} />
          </SectionHeading>
          <AccordionContent isOpen={openIndexes.includes(1)}>
            <ProductSpecifications fields={product.customFields} />
          </AccordionContent>
        </ProductSection>
      </Fragment>
    )}
  </Accordion>
);

export default ProductInfoAccordion;
