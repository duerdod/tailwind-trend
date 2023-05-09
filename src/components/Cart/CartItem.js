import React from 'react';
import { styled } from 'linaria/react';
import { Link } from 'react-router-dom';
import t from '@jetshop/intl';
import useDecrementQuantity from '@jetshop/core/components/Mutation/useDecrementQuantity';
import useIncrementQuantity from '@jetshop/core/components/Mutation/useIncrementQuantity';
import useRemoveFromCart from '@jetshop/core/components/Mutation/useRemoveFromCart';
import getCartItemVariant from '@jetshop/core/helpers/getCartItemVariant';
import Image from '@jetshop/ui/Image';
import { Price } from '@jetshop/ui/Price';
import { ReactComponent as CrossIcon } from '@jetshop/ui/svg/Cross.svg';
import { FlyoutTrigger } from '@jetshop/ui/Modal/Flyout';
import removeFromCartMutation from './queries/removeFromCart.gql';
import incrementQuantityMutation from './queries/incrementQuantity.gql';
import decrementQuantityMutation from './queries/decrementQuantity.gql';
import cartQuery from './queries/cartQuery.gql';

const Wrapper = styled('div')`
  display: flex;
  background: white;
  margin-bottom: 0.5rem;

  > :first-child {
    flex: 1 1 25%;
  }

  > :last-child {
    flex: 1 1 70%;
    padding: 0.5rem;
  }
`;

const ProductName = styled('div')`
  font-size: 0.875rem;
  font-weight: normal;

  a {
    color: #828282;
  }

  .attribute {
    display: block;
  }
`;

const ProductDetail = styled('section')`
  display: grid;
  grid-auto-columns: 1fr 1fr 1fr 1fr;
  grid-template-areas: 'topleft topleft topleft topright' 'bottomleft bottomleft bottomright bottomright';
`;

const ItemDetails = styled('div')`
  grid-area: topleft;
`;

const LinePrice = styled(Price)`
  margin-top: 1rem;
  grid-area: bottomright;
  font-weight: 600;
  text-align: right;
`;

const AdjustQty = styled('div')`
  margin-top: 1rem;
  display: flex;
  grid-area: bottomleft;
  /* Plus/minus buttons */

  button {
    background: #f2f2f2;
    color: black;
    border-radius: 50%;
    height: 20px;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    :focus {
      outline: none;
    }
  }

  /* Count */

  span {
    margin: 0 0.5rem;
    display: inline-block;
  }
`;

const FreeGift = styled('div')`
  margin-top: 1rem;
  font-style: italic;
  grid-area: bottomleft;
`;

const RemoveItem = styled('div')`
  grid-area: topright;
  text-align: right;

  button {
    padding: 0;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    outline: none;
    border: none;
    background: #8f8f8f;
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  svg {
    height: 8px;
    width: 8px;
  }
`;

const CartItem = ({ item, className = '' }) => {
  const { isVariant, variantImage, variantValues, hasVariantImage } =
    getCartItemVariant(item);

  const { incrementQuantity } = useIncrementQuantity({
    incrementQuantityMutation,
    cartQuery
  });

  const { decrementQuantity } = useDecrementQuantity({
    decrementQuantityMutation,
    cartQuery
  });

  const { removeFromCart } = useRemoveFromCart({
    removeFromCartMutation,
    cartQuery
  });

  const variantNamesValues = variantValues.map(
    (value, index) => `${item.variantOptionNames[index]}: ${value}`
  );

  const isFreeItem =
    item.discounts?.filter(d => {
      return d.type === 'FREE_PRODUCT';
    }).length > 0;

  return (
    <Wrapper className={className}>
      <div>
        {item.product.images.length > 0 && (
          <Image
            aspect="1:1"
            sizes="5rem"
            src={
              hasVariantImage ? variantImage.url : item.product.images[0].url
            }
            alt={
              hasVariantImage ? variantImage.alt : item.product.images[0].alt
            }
            quality={80}
          />
        )}
      </div>
      <ProductDetail>
        <ItemDetails>
          <FlyoutTrigger id="cart-flyout">
            {flyout => (
              <ProductName onClick={flyout.hideTarget}>
                <Link to={item.product.primaryRoute.path}>
                  <h2 data-testid="item-name">{item.product.name}</h2>
                  {isVariant && (
                    <ul
                      style={{
                        marginTop: '0'
                      }}
                    >
                      {variantNamesValues.map(
                        (variantOptionNameValue, index) => (
                          <li className="attribute" key={index}>
                            {variantOptionNameValue}
                          </li>
                        )
                      )}
                    </ul>
                  )}
                  {item.configurations.length > 0 && (
                    <ul
                      style={{
                        marginTop: '0'
                      }}
                    >
                      {item.configurations.map(
                        ({ option: { name } }, index) => (
                          <li className="attribute" key={index}>
                            {name}
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </Link>
              </ProductName>
            )}
          </FlyoutTrigger>
        </ItemDetails>

        <RemoveItem>
          <button
            onClick={() =>
              removeFromCart({ itemId: item.id, product: item.product })
            }
            data-testid="remove-from-cart"
          >
            <CrossIcon />
          </button>
        </RemoveItem>

        {!isFreeItem ? (
          <AdjustQty>
            <button
              data-testid="decrement-quantity"
              disabled={item.quantity === 1}
              onClick={() =>
                item.quantity !== 1 && decrementQuantity({ itemId: item.id })
              }
            >
              -
            </button>
            <span data-testid="item-quantity">{item.quantity}</span>
            <button
              data-testid="increment-quantity"
              onClick={() => incrementQuantity({ itemId: item.id })}
            >
              +
            </button>
          </AdjustQty>
        ) : (
          <FreeGift>{t('Free gift')}</FreeGift>
        )}
        <LinePrice
          data-testid="item-price"
          price={item.total}
          previousPrice={item.previousTotal}
        />
      </ProductDetail>
    </Wrapper>
  );
};

export default CartItem;
