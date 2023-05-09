import React, { useContext } from 'react';
import { styled } from 'linaria/react';
import { css, cx } from 'linaria';
import { Form } from 'formik';

import AddToCartFormik from '@jetshop/core/cart/AddToCartFormik';
import ProductConfigurationContext from '@jetshop/core/components/ProductConfigurationProvider/ProductConfigurationContext';
import { useDynamicPrice } from '@jetshop/core/hooks/useDynamicPrice';
import t from '@jetshop/intl';
import { Price } from '@jetshop/ui/Price';
import { useStockStatus } from '@jetshop/ui/Stock/StockStatusContainer';
import { PreOrderDateSelector } from '@jetshop/ui/PreOrderDateSelector';
import { useNotification } from '@jetshop/core/components/Notifications';

import InputWithLabel from '../../Forms/Input';
import Button from '../../ui/Button';
import { IncludedInPackages } from '../PackageProduct/IncludedInPackages';
import { Campaigns } from '../Campaigns';
import NotifyWhenBack from '../StockStatus/NotifyWhenBack';
import StockStatusIndicator from '../StockStatus/StockStatusIndicator';
import { useProductValidationMessage } from '../useProductValidationMessage';
import { VariantSelector, dropdownStyles } from '../VariantSelector';
import { theme } from '../../Theme';
import ProductToastWrapper from './ProductToast';
import { ConfigurationSelector } from '../ConfigurationSelector';
import WarehouseStock from '../StockStatus/WarehouseStock';

import addToCartMutation from '../../Cart/queries/addToCart.gql';
import CartQuery from '../../Cart/queries/cartQuery.gql';
import { PriceHistoryWrapper } from '../PriceHistory';

const StyledForm = styled(Form)`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: 36px;
  ${theme.below.md} {
    align-items: center;
  }
`;

const QuantityAddToCartWrapper = styled('div')`
  margin-top: 16px;
  display: flex;
  width: 100%;
  align-items: flex-end;
`;

const preOrderDateSelectorStyles = css`
  && {
    [data-flight-dropdown-items] {
      width: 100%;
      height: 200px;
      overflow: scroll;
    }
  }
`;

function AddToCartForm({
  product,
  variant,
  getMissingOptions,
  variantHandler
}) {
  const configurationContext = useContext(ProductConfigurationContext);
  const price = useDynamicPrice(product, variant);
  const stockStatus = useStockStatus(variant || product);

  const outOfStockNotify = stockStatus.status === 'notifyWhenBack';
  const { validation: variantValidation, missingOptions } = variantHandler;
  const { hasVariants, hidePrice } = product;
  const { validationMessage, enableValidation } = useProductValidationMessage({
    missingOptions,
    variantValidation,
    hasVariants,
    stockStatus
  });
  const [trigger, dismiss] = useNotification();

  const onAddToCartInit = ({ mutationId, quantity }) => {
    trigger(
      <ProductToastWrapper
        selectedVariation={variant}
        product={product}
        quantity={quantity}
      />,
      {
        id: mutationId,
        type: 'add-to-cart'
      }
    );
  };
  const onAddToCartError = () => {
    return ({ mutationId, quantity, error }) => {
      dismiss(mutationId);

      trigger(
        <ProductToastWrapper
          selectedVariation={variant}
          product={product}
          quantity={quantity}
          error={error}
        />,
        {
          type: 'add-to-cart'
        }
      );
    };
  };
  return (
    <AddToCartFormik
      onAddToCartInit={onAddToCartInit}
      onAddToCartError={onAddToCartError}
      cartQuery={CartQuery}
      cartMutation={addToCartMutation}
      product={product}
      variant={variant}
      getMissingOptions={getMissingOptions}
    >
      {() => {
        return (
          <>
            {product.hasVariants && (
              <VariantSelector
                product={product}
                variantHandler={variantHandler}
                showValidation={!!validationMessage}
              />
            )}
            {product.hasConfigurations && (
              <ConfigurationSelector product={product} />
            )}
            <PreOrderDateSelector
              className={cx(dropdownStyles, preOrderDateSelectorStyles)}
              product={product}
            />
            <Price
              hidePrice={product.hidePrice}
              {...price}
              css={{
                marginBottom: '24px',
                opacity:
                  configurationContext && configurationContext.loading ? 0.3 : 1
              }}
            />
            {!hidePrice && (
              <PriceHistoryWrapper
                articleNumber={product.articleNumber}
                variant={variant}
              />
            )}

            <Campaigns
              campaigns={product.campaigns}
              css={{ marginTop: '-16px', marginBottom: '24px' }}
            />

            <IncludedInPackages packages={product.inPackages} />

            <StyledForm>
              {product.customerComments &&
                product.customerComments.map(comment => (
                  <InputWithLabel
                    wrapperClassName="customer-comment-input-wrapper"
                    className="customer-comment-input"
                    data-testid={`${comment.name}-input`}
                    id={`comments['${comment.name}']`}
                    name={`comments['${comment.name}']`}
                    label={comment.name}
                    key={comment.name}
                  />
                ))}
              <StockStatusIndicator
                status={stockStatus.status}
                text={stockStatus.text}
              />
              {!outOfStockNotify && !hidePrice && (
                <QuantityAddToCartWrapper>
                  <InputWithLabel
                    disableValidation
                    wrapperClassName="quantity-input-wrapper"
                    min="1"
                    type="number"
                    name="quantity"
                    label="Quantity"
                  />
                  <Button
                    data-testid="add-to-cart"
                    type="submit"
                    disabled={!!validationMessage}
                    onClick={enableValidation}
                    style={{
                      opacity: !!validationMessage ? 0.7 : 1,
                      cursor: !!validationMessage ? 'not-allowed' : 'pointer',
                      width: '100%'
                    }}
                  >
                    {validationMessage ? validationMessage : t('Add to cart')}
                  </Button>
                </QuantityAddToCartWrapper>
              )}
            </StyledForm>
            {(product?.warehouseStock?.length > 0 ||
              product?.variants?.values[0]?.warehouseStock?.length > 0) && (
              <WarehouseStock
                product={product}
                variantHandler={variantHandler}
              />
            )}
            {outOfStockNotify && (
              <NotifyWhenBack
                articleNumber={(variant || product).articleNumber}
              />
            )}
          </>
        );
      }}
    </AddToCartFormik>
  );
}

export default AddToCartForm;
