import { useProductVariants } from '@jetshop/core/hooks/useProductVariants';
import { useVariantFromUrl } from '@jetshop/core/hooks/useProductVariants/useVariantFromUrl';
import { useIntl } from '@jetshop/intl';
import { default as Breadcrumbs } from '@jetshop/ui/Breadcrumbs';
import getParentOrCanonicalRoute from '@jetshop/ui/Breadcrumbs/getParentsOrCanonicalRoute';
import { Above } from '@jetshop/ui/Breakpoints';
import loadable from '@loadable/component';
import { styled } from 'linaria/react';
import React from 'react';
import { ReactComponent as DeliveryCheck } from '../../svg/DeliveryCheck.svg';
import MaxWidth from '../Layout/MaxWidth';
import { Favourite } from '../ProductList/Favourite';
import Spinner from '../ui/Spinner';
import AddToCartForm from './AddToCart/AddToCartForm';
import ImageContainer from './Images/ImageContainer';
import ProductInfo, { ProductSection } from './ProductInfo';
import ProductInfoAccordion from './ProductInfoAccordion';
import ProductPageLoadingState from './ProductPageLoadingState';
import { RelatedProducts } from './RelatedProducts';
import { Container } from './styledComponents';
import { theme } from '../Theme';

const LoadablePackageProduct = loadable(
  () => import('./PackageProduct/PackageProduct'),
  {
    fallback: <Spinner />
  }
);

const ProductContainer = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 1rem;
  header {
    h1 {
      font-size: 28px;
      line-height: 1.25;
      + h2 {
        font-size: 16px;
        font-weight: 600;
      }
    }
    margin-bottom: 24px;
  }
  .customer-comment-input-wrapper {
    width: 100%;
    .customer-comment-input {
      height: 44px;
    }
    .status-wrapper {
      top: -39px;
    }
  }
  .quantity-input-wrapper {
    margin-bottom: 0rem;
    margin-right: 10px;
    width: 54px;
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type='number'] {
      border-radius: 4px;
      -moz-appearance: textfield; /* Firefox */
    }
    input {
      width: 54px;
      height: 54px;
      text-align: center;
      padding: 0px;
      margin-bottom: 0px;
    }
    label {
      text-align: center;
    }
  }
  .short-description {
    line-height: 1.5;
    font-size: 16px;
    margin-bottom: 24px;
    color: #707070;
    p {
      margin-bottom: 1rem;
    }
  }
  .delivery-list {
    li {
      display: flex;
      align-items: center;
      svg {
        margin-right: 16px;
      }
      margin-bottom: 16px;
    }
  }
  .product-details {
    ${theme.above.md} {
      align-items: flex-start;
    }

    .price,
    .new-price,
    .old-price {
      font-weight: 600;
      display: inline-block;
    }
    .price,
    .new-price {
      font-size: 1.5rem;
    }
    .new-price {
      margin-right: 8px;
      color: ${theme.colors.red};
    }
    .old-price {
      color: #707070;
    }
  }
`;

const Product = ({ result: { data, loading }, product, partialProduct }) => {
  const initialVariant = useVariantFromUrl();
  const t = useIntl();

  const variantHandler = useProductVariants(product, {
    initialVariant,
    preselectCheapest: true
  });

  const { selectedVariant: selectedVariation, getMissingOptions } =
    variantHandler;

  if (!product) {
    product = partialProduct;
  }
  // Return early if there is no product
  if (!product) {
    return (
      <ProductContainer>
        <ProductPageLoadingState />
      </ProductContainer>
    );
  }

  const images = product.images ?? [];
  const parents = getParentOrCanonicalRoute(data?.route?.parents, product);
  const relatedProducts = product.relatedProducts;

  return (
    <ProductContainer>
      <MaxWidth>
        <Breadcrumbs
          breadcrumbs={data?.route?.breadcrumbs || []}
          parents={parents}
        />
      </MaxWidth>
      <Container>
        <ProductSection>
          {images && (
            <ImageContainer
              images={images}
              variant={selectedVariation}
              badges={product.badges}
            />
          )}
        </ProductSection>
        <ProductSection>
          <div className="product-details">
            <header>
              <Favourite
                product={product}
                variant={selectedVariation}
                style={{
                  float: 'right',
                  marginLeft: 'auto',
                  fontSize: '1.5em'
                }}
              />
              <h1 data-testid="product-title">
                {product.name || 'Loading...'}
              </h1>
              <h2>{product.subName}</h2>
              {product.articleNumber}
            </header>
            <div
              className="short-description"
              dangerouslySetInnerHTML={{
                __html: product.shortDescription
              }}
            />
            {product?.isPackage ? (
              <LoadablePackageProduct product={product} />
            ) : (
              <AddToCartForm
                product={product}
                variant={selectedVariation}
                getMissingOptions={getMissingOptions}
                variantHandler={variantHandler}
              />
            )}
            <ul className="delivery-list" css={{ marginTop: '36px' }}>
              <li>
                <DeliveryCheck /> {t('Express 1–2 working days')}
              </li>
              <li>
                <DeliveryCheck /> {t('Standard 2–5 working days')}
              </li>
              <li>
                <DeliveryCheck /> {t('Free shipping and return')}
              </li>
            </ul>
          </div>
        </ProductSection>

        <Above breakpoint="md">
          {matches =>
            matches ? (
              <ProductInfo product={product} />
            ) : (
              <ProductInfoAccordion product={product} />
            )
          }
        </Above>
      </Container>
      {relatedProducts && <RelatedProducts {...{ relatedProducts, loading }} />}
    </ProductContainer>
  );
};

export default Product;
