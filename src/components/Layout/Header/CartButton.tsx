import { Popover } from '../../../ui/Popover';
import { useCart } from '@jetshop/core/components/Query/CartProvider';
import cartQuery from '../../Cart/CartQuery.gql';

export function CartBadge() {
  const { cart } = useCart(cartQuery);
  const totalQuantity = cart?.totalQuantity;
  return (
    <>
      {totalQuantity > 0 && (
        <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-white">
          {cart?.totalQuantity}
        </span>
      )}
      <span>carticon</span>
    </>
  );
}

function PopoverCart({ children }) {
  return (
    <Popover
      popoverPanelClassName="max-w-full min-w-[24rem] absolute right-0 bg-white shadow-sm rounded"
      PopoverButtonContent={<CartBadge />}
    >
      {children}
    </Popover>
  );
}

export { PopoverCart };
