import React, { useEffect, useRef } from 'react';
import { styled } from 'linaria/react';
import { css } from 'linaria';

import { usePackageProduct } from '@jetshop/core/hooks/PackageProducts';
import { useIntl } from '@jetshop/intl';
import { Price } from '@jetshop/ui/Price';
import { useNotification } from '@jetshop/core/components/Notifications';
import { ReactComponent as Cart } from '../../../svg/Cart.svg';
import {
  default as Button,
  default as ButtonWithLoading
} from '../../ui/Button';
import { PackageProductItem } from './PackageProductItem';
import packageProductQuery from './PackageProductQuery.gql';
import { theme } from '../../Theme';

import addMultipleToCartMutation from '../../Cart/queries/addMultipleToCart.gql';
import cartQuery from '../../Cart/queries/cartQuery.gql';

const PackageProductWrapper = styled('div')`
  padding: 12px;
  background-color: white;
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  margin-bottom: 24px;
  width: 100%;

  .error {
    margin-top: 1em;
    background: #faf3f3;
    padding: 1em;
    label {
      color: #ca0c0c;
    }
  }
  .error button {
    margin-top: 1em;
  }
  .package-product-items-wrapper {
    display: flex;
    flex-direction: column;
  }
  .package-product-price-wrapper {
    font-size: 1.1rem;
    margin-bottom: 0.75em;

    .discount,
    .total {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .discount {
      color: #5f5f5f;
      align-items: center;

      .price {
        font-size: 1.25em;
      }
    }
    .total {
      font-weight: 600;
      .package-price {
        font-size: 1.5em;
      }
    }
  }
`;

const toastStyles = css`
  background: white;
  color: ${theme.colors.black};
  padding: 1em;
  line-height: 1.5;
  display: flex;
  align-items: center;
  white-space: normal;

  svg {
    width: 1.5em;
    height: 1.5em;
    margin-right: 0.5em;
  }
`;

function Notification({ productName }) {
  const t = useIntl();
  return (
    <div className={toastStyles}>
      <Cart />
      <span>
        {t('{productName} has been added to the cart', {
          productName
        })}
      </span>
    </div>
  );
}

export function PackageProduct({ product }) {
  const ref = useRef(null);

  const {
    addPackageToCart,
    status,
    price,
    error,
    retry,
    updatePackageItem,
    packageProduct
  } = usePackageProduct({
    product,
    packageProductQuery
  });

  // validation is not enabled until the 'add to cart' button is pressed once
  const [validationEnabled, enableValidation] = React.useReducer(
    () => true,
    false
  );

  const t = useIntl();

  const buyable = status === 'buyable';

  function add() {
    addPackageToCart({
      addMultipleToCartMutation,
      cartQuery
    });
  }

  function scrollToProducts() {
    window.scrollTo({ top: ref.current.offsetTop, behavior: 'smooth' });
  }

  const [notify] = useNotification();

  useEffect(() => {
    if (status === 'added') {
      notify(<Notification productName={product.name} />);
    }
  }, [notify, product.name, status]);

  if (status === 'loading') {
    return <LoadingState />;
  }

  return (
    <PackageProductWrapper ref={ref}>
      <div className="package-product-items-wrapper">
        {packageProduct.package.items.map((item, idx) => {
          return (
            <PackageProductItem
              item={item}
              key={item.product.id}
              updatePackageItem={updatePackageItem}
              validationEnabled={validationEnabled}
              price={price.items[idx]}
              fetchingPrice={status === 'fetching_price'}
            />
          );
        })}
      </div>

      <PackagePrice data={price} fetching={status === 'fetching_price'} />

      <Button
        data-testid="package-product-add-to-cart"
        disabled={validationEnabled && !buyable}
        loading={status === 'fetching_price'}
        loadingText={t('Updating price... ')}
        onClick={
          buyable
            ? add
            : () => {
                enableValidation();
                scrollToProducts();
              }
        }
      >
        {status === 'added'
          ? t('Successfully added!')
          : status === 'invalid' && validationEnabled
          ? t('Select the variants')
          : t('Add to cart')}
      </Button>
      {status === 'error' && <Error error={error} retry={retry} />}
    </PackageProductWrapper>
  );
}

function LoadingState() {
  const t = useIntl();
  return (
    <PackageProductWrapper>
      {t('Loading package details...')}
    </PackageProductWrapper>
  );
}

function PackagePrice({ data, fetching }) {
  const t = useIntl();
  return (
    <div
      className="package-product-price-wrapper"
      style={{
        opacity: fetching ? 0.3 : 1
      }}
    >
      <div className="discount">
        <p className="package-price-label">{t('Package Discount')}</p>
        <Price
          negative
          price={data.discountValue}
          className="package-price"
        ></Price>
      </div>
      <div className="total">
        <p className="package-price-label">{t('Total')}</p>
        <Price
          data-testid="package-price-total"
          price={data.price}
          className="package-price"
        ></Price>
      </div>
    </div>
  );
}

function Error({ error, retry }) {
  const t = useIntl();

  // TODO: API will be changed to allow a `abortOnError` or similar variable
  // for addMultipleToCart. Currently it's possible to end up in a state where
  // some items in the package failed and some succeeded. After the change,
  // complete failure will be the only case we need to handle.
  return (
    <div className="error">
      <label>
        {t('Something went wrong when { placeholder }', {
          placeholder:
            error.fromState === 'fetchingPrice'
              ? ' fetching price. This item cannot be added to the cart at this time'
              : ' adding to cart'
        })}
        .
      </label>
      {error.messages.map(err => (
        <div>{err}</div>
      ))}
      <ButtonWithLoading onClick={retry}>{t('Retry')}</ButtonWithLoading>
    </div>
  );
}

export default PackageProduct;
