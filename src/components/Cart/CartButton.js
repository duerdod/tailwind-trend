import React from 'react';
import { css } from 'linaria';
import { styled } from 'linaria/react';

import CartProvider from '@jetshop/core/components/Query/CartProvider';
import t from '@jetshop/intl';
import { Above } from '@jetshop/ui/Breakpoints';
import { DrawerTrigger } from '@jetshop/ui/Modal/Drawer/DrawerTrigger';
import { FlyoutTrigger } from '@jetshop/ui/Modal/Flyout';
import { ReactComponent as CartIcon } from '../../svg/Cart.svg';
import Badge from '../ui/Badge';
import cartQuery from './queries/cartQuery.gql';

const Button = styled('button')`
  padding: 0;
  background: transparent;
  color: inherit;
  border: 0;
  outline: none;
`;

const cartButtonWrapper = css`
  position: relative;
  .badge {
    position: absolute;
    right: -5px;
    top: -5px;
    pointer-events: none;
    color: white;
    font-size: 8px;
  }
`;

function CartButton({ target, itemsInCart, className }) {
  return (
    <div className={cartButtonWrapper}>
      <Button
        className={className}
        data-testid="cart-button"
        onClick={target.isOpen ? target.hideTarget : target.showTarget}
      >
        <CartIcon className="badge-svg-wrapper" />
        <span>{t('Cart')}</span>
      </Button>
      {itemsInCart > 0 && <Badge text={itemsInCart} />}
    </div>
  );
}

function CartButtonFlyout({ className }) {
  return (
    <CartProvider query={cartQuery}>
      {result => {
        const itemsInCart = result?.data?.cart?.totalQuantity || 0;

        // Drawer on mobile, flyout on desktop
        return (
          <Above breakpoint="md">
            {matches =>
              matches ? (
                <FlyoutTrigger id="cart-flyout">
                  {flyout => (
                    <CartButton
                      className={className}
                      target={flyout}
                      itemsInCart={itemsInCart}
                    />
                  )}
                </FlyoutTrigger>
              ) : (
                <DrawerTrigger preventOverflow={true} id="cart-drawer">
                  {drawer => (
                    <CartButton
                      className={className}
                      target={drawer}
                      itemsInCart={itemsInCart}
                    />
                  )}
                </DrawerTrigger>
              )
            }
          </Above>
        );
      }}
    </CartProvider>
  );
}

export default CartButtonFlyout;
