import React from 'react';
import { css, cx } from 'linaria';

import {
  useProductList,
  useProductListItems
} from '@jetshop/core/hooks/ProductList';
import { useAddMultipleToCart } from '@jetshop/core/hooks/useAddMultipleToCart';
import t from '@jetshop/intl';
import { useNotification } from '@jetshop/core/components/Notifications';

import { ReactComponent as CartIcon } from '../../svg/Cart.svg';
import MaxWidth from '../Layout/MaxWidth';
import { theme } from '../Theme';
import Button from '../ui/Button';
import { Product } from './Product';
import { Helmet } from 'react-helmet-async';

import addMultipleToCartMutation from '../Cart/queries/addMultipleToCart.gql';
import cartQuery from '../Cart/queries/cartQuery.gql';

export function Favourites() {
  const listId = null;

  const { products, loading } = useProductListItems(listId);
  const [trigger] = useNotification();

  const validItems = getItemsForAddToCart(products);
  const validItemCount = validItems.length;

  const [addToCart, { loading: mutationLoading }] = useAddMultipleToCart(
    validItems,
    {
      addMultipleToCartMutation,
      cartQuery
    },
    {
      onCompleted: () => {
        trigger(
          <AddAllSuccessToast>
            <CartIcon />
            {t(
              '{productCount, plural, =1 {# product added to the cart.} other {# products added to the cart.}}',
              { productCount: validItemCount }
            )}
          </AddAllSuccessToast>
        );
      }
    }
  );

  const noProductsInList = products.length === 0 && !loading;
  const loadingInitialRender = products.length === 0 && loading;

  if (noProductsInList) {
    return (
      <MaxWidth className={cx(container, loading ? 'loading' : null)}>
        <Helmet>
          <meta name="robots" content="noindex" />
        </Helmet>
        <h1>{t('Saved items')}</h1>
        <p>{t('There are no products in your saved items list.')}</p>
      </MaxWidth>
    );
  }

  if (loadingInitialRender) {
    return (
      <MaxWidth className={cx(container, loading ? 'loading' : null)}>
        <h1>{t('Saved items')}</h1>
        <p>{t('Loading your saved items…')}</p>
      </MaxWidth>
    );
  }

  return (
    <MaxWidth className={cx(container, loading ? 'loading' : null)}>
      <ul className="product-grid">
        {products.map((product, index) => {
          return (
            <li
              key={product.variant?.articleNumber || product.articleNumber}
              data-valid={product.validation.status}
            >
              <Product listId={listId} product={product} />
            </li>
          );
        })}
      </ul>
      <div className="add-clear">
        <Button
          style={{ marginTop: '2em' }}
          onClick={addToCart}
          loading={mutationLoading}
          className="add-all"
          disabled={validItemCount === 0}
        >
          {validItemCount > 0
            ? mutationLoading
              ? t('One moment…')
              : t(
                  '{productCount, plural, =1 {Add # product to cart} other {Add # products to cart}}',
                  { productCount: validItemCount }
                )
            : t('No valid items to add to cart')}
        </Button>
        <ClearList listId={listId}>{t('Clear list')}</ClearList>
      </div>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
    </MaxWidth>
  );
}

function AddAllSuccessToast({ children }) {
  return <div className={addAllToastStyles}>{children}</div>;
}

function ClearList({ children, listId }) {
  const { clear } = useProductList(listId);
  return (
    <Button secondary onClick={clear}>
      {children}
    </Button>
  );
}

function getItemsForAddToCart(products) {
  // When adding to cart we only want valid items, and each articleNumber needs
  // to be the variant rather than the base product
  return products
    .filter(product => {
      return product.validation.status === 'valid' && !product.hidePrice;
    })
    .map(product => ({
      ...product,
      articleNumber: product.isVariant
        ? product.variant.articleNumber
        : product.articleNumber
    }));
}

const container = css`
  margin-top: 2em;
  &.loading {
    opacity: 0.6;
  }

  h1 {
    margin-bottom: 1em;
    font-weight: 600;
  }

  .product-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: stretch;
    margin-right: -${theme.space[1]};
    margin-left: -${theme.space[1]};
    width: 100%;

    > * {
      line-height: 19px;
      min-width: 0;
      margin: ${theme.space[1]};
      width: calc(50% - ${theme.space[2]});

      ${theme.above.md} {
        width: calc(33.333% - ${theme.space[2]});
      }
      ${theme.above.lg} {
        width: calc(25% - ${theme.space[2]});
      }
    }
  }

  [data-valid] .product-card {
    border: 1px solid ${theme.colors.beige};
  }
  [data-valid='valid'] .product-card {
    border: 1px solid ${theme.colors.tablegrey};
  }
  .product-card {
    a {
      margin: 0;
      border: 0;
    }
  }
  .product-card-detail,
  .product-card,
  .product-card a {
    background: white;
  }
  li:not([data-valid='valid']) .product-card {
    background: rgba(255, 255, 255, 0.2);
    a {
      opacity: 0.5;
      background: rgba(255, 255, 255, 0.2);
    }
  }

  .select-variant {
    margin: 0;
    padding: 1em;
    position: relative;
    z-index: 999;
    [data-flight-dropdown] {
      + [data-flight-dropdown] {
        margin-top: 0.5em;
      }
      button,
      ul,
      li {
        width: 100%;
      }
      li {
        display: flex;
        justify-content: space-between;
      }
    }
  }

  .add-clear button {
    max-width: 30ch;
    display: block;
    margin: 0.5em auto;
  }

  .new-price,
  .old-price {
    display: inline-block;
  }
  .old-price {
    margin-left: 0.5em;
  }
`;

const addAllToastStyles = css`
  background: white;
  color: ${theme.colors.black};
  padding: 1em;
  display: flex;
  align-items: center;

  svg {
    max-width: 1.5em;
    max-height: 1.5em;
    margin-right: 0.5em;
  }
`;
