import React, { useContext } from 'react';
import { css } from 'linaria';
import { useMutation } from '@apollo/react-hooks';

import t from '@jetshop/intl';
import { CartIdContext } from '@jetshop/core/components/Cart/CartIdContext';
import { addToCartSuccess } from '@jetshop/core/components/Mutation/AddToCart/addToCartUtils';
import { useNotification } from '@jetshop/core/components/Notifications';

import ProductToastWrapper from '../ProductPage/AddToCart/ProductToast';

import { addToCart } from '../Cart/queries/addToCart.gql';

const addButton = css`
  background: white;
  border: 0.75px solid #bfbdbd;
  text-align: center;
  padding: 1em;
  width: 100%;
`;

/**
 *
 * @param {object} props
 * @param {import('@jetshop/core/hooks/ProductList').ProductListProduct} props.product
 */
export function AddToCart({ product }) {
  const { cartId, setCartId } = useContext(CartIdContext);
  const articleNumber = product.variant?.articleNumber || product.articleNumber;
  const price = {
    price: product.variant?.price || product.price,
    previousPrice: product.variant?.previousPrice || product.previousPrice
  };

  const [trigger] = useNotification();

  const [add] = useMutation(addToCart, {
    variables: {
      input: {
        cartId,
        articleNumber,
        quantity: 1
      }
    },
    onCompleted: data => {
      trigger(
        <ProductToastWrapper
          selectedVariation={product.variant}
          product={product}
          quantity={1}
          price={price}
        />,
        { type: 'add-to-cart' }
      );

      addToCartSuccess({ cartId, setCartId })({ data });
    }
  });

  return (
    <button
      className={addButton}
      onClick={() => add()}
      disabled={product.hidePrice}
    >
      {t('Add to cart')}
    </button>
  );
}
