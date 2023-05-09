import React from 'react';
import { styled } from 'linaria/react';

import { useTracker } from '@jetshop/core/analytics/Analytics';
import { trackCartCheckoutEvent } from '@jetshop/core/analytics/tracking';
import ChannelContext from '@jetshop/core/components/ChannelContext';
import CartProvider from '@jetshop/core/components/Query/CartProvider';
import t from '@jetshop/intl';
import Image from '@jetshop/ui/Image/Image';
import { Price } from '@jetshop/ui/Price';
import useProductToast from './useProductToast';

import { baseStyles } from '../../ui/Button';
import { theme } from '../../Theme';

import cartQuery from '../../Cart/queries/cartQuery.gql';

const Container = styled('aside')`
  ${theme.above.sm} {
    width: 320px;
  }
  ${theme.below.sm} {
    width: 100%;
  }
  background-color: ${theme.colors.white};
`;

const CheckoutButton = styled.a`
  ${baseStyles}
  padding: ${theme.space[2]};
  margin: ${theme.space[1]};
  text-align: center;
  background: ${theme.colors.blue};
  color: white;
`;

const ProductImageWrapper = styled('div')`
  width: 5rem;
  margin-right: 1rem;
`;

const ProductCheckoutContainer = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  a {
    text-decoration: none;
    :hover {
      opacity: 0.8;
      text-decoration: none;
      color: white;
    }
  }
`;

const Product = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin: ${theme.space[2]};
`;

const ProductDetails = styled('div')`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  color: black;

  .price,
  .new-price {
    margin-top: 0.75rem;
  }

  .old-price {
    margin-top: 0.25rem;
  }

  .new-price {
    color: ${theme.colors.red};
  }
`;

const Header = styled('h3')`
  font-size: ${theme.fontSizes[2]};
  margin-bottom: ${theme.space[1]};
`;

const ProductName = styled('p')`
  font-size: ${theme.fontSizes[0]};
`;

const Error = styled('p')`
  color: red;
  margin-top: ${theme.space[1]};
  font-size: ${theme.fontSizes[0]};
`;

const ProductToast = ({
  product,
  cart,
  selectedVariation,
  quantity,
  error
}) => {
  const { price, previousPrice, image } = useProductToast({
    product,
    selectedVariation,
    quantity
  });
  const track = useTracker();
  return (
    <Container data-testid="product-toast">
      <ProductCheckoutContainer>
        <Product>
          {product.images.length > 0 && (
            <ProductImageWrapper>
              <Image
                src={image.url}
                sizes={80}
                aspect={'1:1'}
                alt={image.alt}
                quality={80}
              />
            </ProductImageWrapper>
          )}
          <ProductDetails>
            {error ? (
              <Header>{t('Failed adding to bag')}</Header>
            ) : quantity === 1 ? (
              <Header>{t('Added to bag')}</Header>
            ) : (
              <Header>
                {t.rich('Added {quantity} items to bag', { quantity })}
              </Header>
            )}
            <ProductName>{product.name}</ProductName>
            {!error && <Price price={price} previousPrice={previousPrice} />}
            {error && (
              <Error>
                {t('An error occurred. Details:')}
                <ul>
                  {error.graphQLErrors && error.graphQLErrors.length > 0 ? (
                    error.graphQLErrors.map(({ message, locations, path }) => (
                      <li key={message}>{t(message)}</li>
                    ))
                  ) : (
                    <li>{t(error.message)}</li>
                  )}
                </ul>
              </Error>
            )}
          </ProductDetails>
        </Product>
        {cart && cart.externalCheckoutUrl && (
          <ChannelContext.Consumer>
            {({ selectedChannel }) => (
              <CheckoutButton
                href={cart.externalCheckoutUrl}
                onClick={event => {
                  event.preventDefault();
                  track(
                    trackCartCheckoutEvent({
                      cart: cart,
                      callback: () => {
                        window.location = cart.externalCheckoutUrl;
                      }
                    })
                  );
                }}
              >
                {t('To checkout')}
              </CheckoutButton>
            )}
          </ChannelContext.Consumer>
        )}
      </ProductCheckoutContainer>
    </Container>
  );
};
const ProductToastWrapper = props => (
  <CartProvider query={cartQuery}>
    {({ data }) => <ProductToast {...props} cart={data && data.cart} />}
  </CartProvider>
);

export default ProductToastWrapper;
