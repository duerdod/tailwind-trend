import { usePackageProductItem } from '@jetshop/core/hooks/PackageProducts';
import Image from '@jetshop/ui/Image';
import { Price } from '@jetshop/ui/Price';
import ProductLink from '@jetshop/ui/ProductLink';
import React from 'react';
import { styled } from 'linaria/react';
import StockStatusIndicator from '../StockStatus/StockStatusIndicator';
import { VariantSelector } from '../VariantSelector';

const PackageProductItemWrapper = styled('div')`
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 12px;
  padding-bottom: 12px;
  color: black;
  display: flex;
  align-items: flex-start;

  .product-link {
    width: 72px;
    margin-right: 12px;
    img {
      :hover {
        opacity: 0.8 !important;
      }
    }
  }

  .product-name {
    font-weight: 600;
    font-size: 18px;
    text-decoration: none;
    color: black;
    :hover {
      text-decoration: underline;
    }
  }

  .product-detail {
    width: 100%;
    > * + * {
      margin-top: 0.5em;
      margin-bottom: 0;
    }
  }

  .flex {
    display: flex;
    align-items: center;
  }
  .price-quantity-wrapper {
    margin-left: auto;
    font-size: 18px;
    display: flex;
    align-items: center;
    .package-product-price {
      .price,
      .new-price,
      .old-price {
        display: inline-block;
        margin-right: 0px;
        margin-left: 8px;
      }
      .price,
      .new-price {
        color: #ca0c0c;
        font-size: 18px;
      }
      .old-price {
        color: black;
      }
    }
  }
`;

export function PackageProductItem({
  item,
  updatePackageItem,
  validationEnabled,
  price,
  fetchingPrice
}) {
  const { stockStatus, variantHandler } = usePackageProductItem(
    item,
    updatePackageItem,
    { preselectCheapest: true }
  );

  const product = item.product;

  return (
    <PackageProductItemWrapper>
      <ProductLink product={product} className="product-link">
        <Image
          sizes={[1 / 10]}
          aspect={'1:1'}
          alt={product.images[0].alt}
          src={product.images[0].url}
        ></Image>
      </ProductLink>
      <div className="product-detail">
        <header>
          <ProductLink product={product} className="product-name">
            {product.name}
          </ProductLink>
          <p>{product.subName}</p>
        </header>
        {product.hasVariants && (
          <VariantSelector
            product={product}
            variantHandler={variantHandler}
            showValidation={validationEnabled}
            disableOutOfStock
          />
        )}
        <div className="flex">
          <StockStatusIndicator
            status={stockStatus.status}
            text={stockStatus.text}
            style={{ marginTop: 0 }}
          />
          <div
            className="price-quantity-wrapper"
            style={{
              opacity: fetchingPrice ? 0.3 : 1
            }}
          >
            {item.minQuantity > 1 && `${item.minQuantity} x`}
            <Price {...price} className="package-product-price" />
          </div>
        </div>
      </div>
    </PackageProductItemWrapper>
  );
}
