import React from 'react';
import { styled } from 'linaria/react';

import { useTracker } from '@jetshop/core/analytics/Analytics';
import { trackCartCheckoutEvent } from '@jetshop/core/analytics/tracking';
import CartProvider from '@jetshop/core/components/Query/CartProvider';
import t from '@jetshop/intl';
import { Above } from '@jetshop/ui/Breakpoints';
import Drawer, { DrawerTarget } from '@jetshop/ui/Modal/Drawer';
import { FlyoutTarget } from '@jetshop/ui/Modal/Flyout';
import { Price } from '@jetshop/ui/Price';
import { useChannelSettings } from '@jetshop/core/hooks/Channels/useChannelSettings';
import { Currency } from '@jetshop/ui/Price/Currency';

import { theme } from '../Theme';
import { baseStyles } from '../ui/Button';
import CartItem from './CartItem';
import FreeShipping from './FreeShipping';

import cartQuery from './queries/cartQuery.gql';

const Flyout = styled('div')`
  background: white;
  color: ${theme.colors.black};
  ${theme.above.sm} {
    position: absolute;
    z-index: 999;
    right: 0;
    top: 3.5rem;
    width: 22rem;
    min-width: 19rem;
    max-width: 100%;
  }
`;

const LightText = styled('span')`
  color: #828282;
  font-size: 0.875rem;
  font-weight: normal;
`;

const Header = styled('header')`
  text-align: center;
  h2 {
    font-weight: 600;
  }
  ${LightText} {
    display: block;
  }
  padding: 1rem;
  border-bottom: 1px solid #e8e8e8;
`;

const ItemCount = ({ count }) => (
  <LightText>
    {t(
      `{
        count, plural,
        =0 {}
        one {1 item}
        other {{count} items}
            }`,
      { count }
    )}
  </LightText>
);

const CartItems = styled('section')`
  background: #fafafa;
  padding: 1rem;
`;

const Summary = styled('section')`
  background: #fff;
  padding: 1rem;

  a {
    width: 100%;
    color: white;
    :hover {
      color: white;
    }
  }

  h2 {
    font-weight: bold;
    font-size: 1.2em;
  }

  .discounts {
    margin-bottom: 1em;
    h2 {
      margin-bottom: 1em;
    }
  }

  .cart-total {
    padding-top: 1em;
    border-top: 1px solid ${theme.colors.lightgrey};

    > * + * {
      margin-top: 0.5em;
    }

    .shipping,
    .total,
    .vat {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .total {
      font-size: 1.25rem;
      font-weight: 600;
      color: ${theme.colors.black};
    }
  }
`;

const Flex = styled('div')`
  display: flex;
  justify-content: space-between;
`;

const Checkout = styled.a`
  ${baseStyles};
  width: 100%;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  &&:hover {
    color: white;
    text-decoration: none;
  }
`;

const CartFlyoutView = ({ result, modal, ...rest }) => {
  const items = result?.data?.cart?.items ?? [];
  const itemCount = result?.data?.cart?.totalQuantity ?? 0;
  const checkoutUrl = result?.data?.cart?.externalCheckoutUrl;
  const discounts = result?.data?.cart?.aggregatedDiscounts ?? [];
  const track = useTracker();
  const { pricesIncVat } = useChannelSettings();

  if (items.length === 0) {
    return (
      <Flyout {...rest}>
        <div style={{ padding: '2em' }}>{t('No items in cart.')}</div>
      </Flyout>
    );
  }

  return (
    <Flyout {...rest}>
      <Header>
        <h2>Your cart</h2>
        <ItemCount count={itemCount} />
      </Header>
      <Summary>
        {checkoutUrl && (
          <Checkout
            data-testid="checkout-button"
            href={checkoutUrl}
            onClick={event => {
              event.preventDefault();
              track(
                trackCartCheckoutEvent({
                  cart: result.data.cart,
                  callback: () => {
                    window.location = checkoutUrl;
                  }
                })
              );
            }}
          >
            {t('Check out')}
          </Checkout>
        )}
      </Summary>
      <CartItems>
        {items.map(item => (
          <CartItem item={item} key={item.id} />
        ))}
      </CartItems>
      <Summary>
        {discounts.length > 0 && (
          <div className="discounts">
            <h2>{t('Cart total')}</h2>
            <Flex>
              <label>{t('Order value')}</label>
              <Price price={result.data.cart.productPreviousTotal} />
            </Flex>
            <h2 style={{ marginTop: '1em' }}>{t('Discounts')}</h2>
            {discounts.map(discount => {
              return (
                <Flex key={discount.name} style={{ marginTop: '1em' }}>
                  <label>{discount.name}</label>
                  <Price
                    price={discount.value}
                    style={{ display: 'inline' }}
                    negative
                  />
                </Flex>
              );
            })}
          </div>
        )}

        <div className="cart-total">
          <FreeShipping
            className="shipping"
            cartTotal={result.data.cart.productTotal}
          />

          <div className="total">
            <label>
              {pricesIncVat ? t('Total incl. VAT') : t('Total excl. VAT')}
            </label>
            <Price price={result.data.cart.productTotal} />
          </div>

          <VAT
            className="vat"
            total={result.data.cart.productTotal}
            pricesIncVat={pricesIncVat}
          />
        </div>
      </Summary>
    </Flyout>
  );
};

function VAT({ total, pricesIncVat, ...rest }) {
  return (
    <div {...rest}>
      <label>{pricesIncVat ? t('of which VAT') : t('+ VAT')}</label>
      <div>
        <Currency value={total.vat} />
      </div>
    </div>
  );
}

const CartFlyout = props => (
  // Wrap the flyout with the needed providers
  <CartProvider query={cartQuery}>
    {result =>
      result.data && result.data.cart ? (
        <Above breakpoint="md">
          {matches =>
            matches ? (
              <FlyoutTarget id="cart-flyout">
                {flyout => (
                  <CartFlyoutView modal={flyout} result={result} {...props} />
                )}
              </FlyoutTarget>
            ) : (
              <DrawerTarget id="cart-drawer">
                {drawer => (
                  <Drawer isOpen={drawer.isOpen} right>
                    <CartFlyoutView modal={drawer} result={result} {...props} />
                  </Drawer>
                )}
              </DrawerTarget>
            )
          }
        </Above>
      ) : null
    }
  </CartProvider>
);

export default CartFlyout;
