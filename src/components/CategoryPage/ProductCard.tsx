import React from 'react';
import t from '@jetshop/intl';
import Image, { transparentDataImg } from '../../ui/Image';
import { Price } from '../../ui/Price';
import { ProductLink } from '../../ui/Links/ProductLink';

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
}: any) {
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
      className="wrapperStyling"
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
            critical={loadImageEagerly}
          />
        ) : (
          <Image sizes={[0]} src={transparentDataImg} />
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
