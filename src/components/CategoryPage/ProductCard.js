import t from '@jetshop/intl';
import Image, { transparentDataImg } from '@jetshop/ui/Image/Image';
import { Price } from '@jetshop/ui/Price';
import ProductLink from '@jetshop/ui/ProductLink';
import Badges from '@jetshop/ui/ProductList/Badges';
import { css, cx } from 'linaria';
import React from 'react';
import { theme } from '../Theme';

const wrapperStyling = css`
  font-size: 1rem;
  position: relative;
  a {
    text-decoration: none;
    color: inherit;
    display: block;
    background: white;
    border: 1px solid ${theme.colors.tablegrey};
  }

  .product-card-detail {
    background: white;
    padding: 0.75em;
    line-height: 1.35;
    border-top: 1px solid ${theme.colors.tablegrey};
    h3 {
      font-weight: 600;
      font-size: 1em;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    h4 {
      font-weight: normal;
      font-size: 1em;
      color: ${theme.colors.darkerGrey};
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  .package-badge {
    background: black;
    color: white;
    font-size: 14px;
    padding: 3px 6px;
  }
  .price-package-wrapper {
    display: flex;
    align-items: center;
    .package-price-label {
      font-size: 12px;
      color: grey;
      margin-left: 5px;
    }
  }

  .badge-top-right {
    top: 3em;
  }
`;

export function ProductCard({
  product,
  className,
  imageAspect = '1:1',
  imageSizes = [1 / 2, 1 / 2, 1 / 3, 1 / 4],
  forwardRef,
  as = 'li',
  children,
  loadImageEagerly = false,
  ...linkProps
}) {
  const hasImages = product.images && product.images.length > 0;
  const Tag = as;
  let badges = [...(product.badges || [])];
  product.isPackage &&
    badges.push({
      location: 'TOP_RIGHT',
      name: 'Package',
      text: t('Package'),
      style: 'package-badge'
    });
  return (
    <Tag
      className={cx('product-card', wrapperStyling, className)}
      data-testid="product"
      data-product-card
      ref={forwardRef}
    >
      <ProductLink
        product={product}
        {...linkProps}
        style={{
          margin: '0 0.5em 1em'
        }}
      >
        {hasImages ? (
          <Image
            sizes={imageSizes}
            aspect={imageAspect}
            alt={product.images[0].alt}
            src={product.images[0].url}
            modifiedDate={product.images[0].modifiedDate}
            badges={<Badges badges={badges} />}
            critical={loadImageEagerly}
          ></Image>
        ) : (
          <Image src={transparentDataImg} />
        )}
        <section className="product-card-detail">
          <header>
            <h3>{product.name}</h3>
            <h4 className="sub-name">{product.subName || '\u00A0'}</h4>
          </header>
          <div className="price-package-wrapper">
            <Price
              hidePrice={product.hidePrice}
              price={product.price}
              previousPrice={product.previousPrice}
            />
          </div>
        </section>
      </ProductLink>
      {children}
    </Tag>
  );
}
