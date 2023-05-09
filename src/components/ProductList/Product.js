import t from '@jetshop/intl';
import React from 'react';
import { css } from 'linaria';
import { ProductCard } from '../CategoryPage/ProductCard';
import { AddToCart } from './AddToCart';
import { SelectVariant } from './SelectVariant';
import { ReactComponent as TrashSVG } from '../../svg/trash.svg';
import { useProductList } from '@jetshop/core/hooks/ProductList';

export function Product({ product, loading, children, listId }) {
  // Use the variant's image for display
  const productForDisplay = { ...product };
  if (
    product.isVariant &&
    product.variant.images &&
    product.variant.images.length > 0
  ) {
    productForDisplay.images = product.variant.images;
  }

  return (
    <>
      <ProductCard product={productForDisplay} as="div">
        {product.hasVariants && (
          <div className="select-variant">
            <SelectVariant listId={listId} product={product} />
          </div>
        )}
        {product.validation.status === 'valid' ? (
          <AddToCart product={product} />
        ) : (
          <InvalidProduct validation={product.validation} />
        )}
        <RemoveFromList
          listId={listId}
          articleNumber={product.articleNumber}
          variant={product.variant}
        />
      </ProductCard>
    </>
  );
}

function RemoveFromList({ children, articleNumber, variant, listId }) {
  const { remove } = useProductList(listId);
  const variantArticleNumber = variant?.articleNumber;
  return (
    <button
      className={removeStyles}
      onClick={() => remove(articleNumber, { variantArticleNumber })}
    >
      <TrashSVG />
    </button>
  );
}

function InvalidProduct({ validation }) {
  const { status } = validation;
  const reasonMessages = {
    outOfStock: t('Out of stock'),
    missingVariant: t('Select options'),
    preOrder: t('Visit product page to add'),
    configurations: t('Visit product page to add'),
    package: t('Visit product page to add')
  };
  return (
    <div className={invalidProductStyles}>
      {reasonMessages[status] || t('Not available')}
    </div>
  );
}

const removeStyles = css`
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  background: white;
  border: 1px solid silver;
  border-radius: 50%;
  padding: 0.5em;
  svg {
    height: 1.25em;
    width: 1.25em;
  }
`;

const invalidProductStyles = css`
  background: #e7e7e7;
  border: 0.75px solid #bfbdbd;
  text-align: center;
  padding: 1em;

  color: #555555;
`;
