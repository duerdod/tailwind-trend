import { useProductList } from '@jetshop/core/hooks/ProductList';
import React from 'react';
import { css } from 'linaria';
import { ReactComponent as HeartSVG } from '../../svg/Heart.svg';

const favourite = css`
  button {
    background: transparent;
    svg {
      &.active {
        fill: currentColor;
      }
    }
  }
`;

export function Favourite({ product, variant, listId, ...rest }) {
  const articleNumber = product.articleNumber;

  const selectedVariation = product.variant || variant;
  const variantArticleNumber = selectedVariation?.articleNumber;

  const { toggle, inList } = useProductList(listId);

  function toggleWithoutBubble(e) {
    e.preventDefault();
    toggle(articleNumber, {
      variantArticleNumber,
      productName: product.name
    });
  }

  const isInList = inList(articleNumber, {
    variantArticleNumber
  });

  return (
    <div className={favourite} {...rest}>
      <button onClick={toggleWithoutBubble} aria-label="Add to favourites">
        <HeartSVG
          className={isInList ? 'active' : 'inactive'}
          style={{ height: '1em', width: '1em' }}
        />
      </button>
    </div>
  );
}
