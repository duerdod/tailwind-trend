import useOrderDetailQuery from '@jetshop/core/hooks/useOrderDetailQuery';
import Image from '@jetshop/ui/Image';
import React from 'react';
import { css, cx } from 'linaria';
import { Price } from '@jetshop/ui/Price';
import { theme } from '../../../Theme';
import OrderDetail from './OrderDetail.gql';
import { OrderTotals } from './OrderTotals';
import { ShippingPayment } from './ShippingPayment';
import t from '@jetshop/intl';
import ProductLink from '@jetshop/ui/ProductLink';

const fullDetail = css`
  font-size: 0.875rem;
  line-height: 1.25;
  h2 {
    font-weight: bold;
  }
  &.loading {
    opacity: 0.5;
  }
  &.error,
  &.loading {
    padding: 1em;
    text-align: center;
  }
`;

const listDetailHeader = css`
  display: grid;
  display: -ms-grid;
  grid-template-areas: 'left left center right';
  grid-template-columns: 4rem 2fr 0.65fr 1fr;
  -ms-grid-columns: 4rem 2fr 0.65fr 1fr;
  padding: 0 1em;
  border-bottom: 1px solid ${theme.colors.tablegrey};
  h3 {
    text-transform: uppercase;
    padding-bottom: 0.5em;
    font-size: 1em;
  }

  .prod {
    grid-area: left;
    -ms-grid-row: 1;
    -ms-grid-column: 1;
    -ms-grid-column-span: 2;
  }
  .qty {
    grid-area: center;
    -ms-grid-row: 1;
    -ms-grid-column: 3;
  }
  .price {
    -ms-grid-row: 1;
    -ms-grid-column: 4;
    grid-area: right;
    text-align: right;
  }
`;

const variantValue = css`
  display: block;
`;

function ListDetailHeader() {
  return (
    <header className={listDetailHeader}>
      <h3 className="prod">{t('Product')}</h3>
      <h3 className="qty">{t('Quantity')}</h3>
      <h3 className="price">{t('Price')}</h3>
    </header>
  );
}

function OrderItem({ item, currency }) {
  const { product } = item;
  const isVariant = item.variant;

  const variantNamesValues = isVariant
    ? item.variant.values.map(
        (value, index) => `${item.variantOptionNames[index]}: ${value}`
      )
    : [];

  return product ? (
    <li className={orderItem}>
      <div className="image-wrapper">
        {product.images && product.images.length > 0 && (
          <>
            <ProductLink product={product}>
              <Image
                sizes="4rem"
                aspect="3:4"
                alt={
                  isVariant
                    ? (item.variant.images &&
                        item.variant.images[0] &&
                        item.variant.images[0].alt) ||
                      (product.images &&
                        product.images[0] &&
                        product.images[0].alt)
                    : product.images &&
                      product.images[0] &&
                      product.images[0].alt
                }
                src={
                  isVariant
                    ? (item.variant.images &&
                        item.variant.images[0] &&
                        item.variant.images[0].url) ||
                      (product.images &&
                        product.images[0] &&
                        product.images[0].url)
                    : product.images &&
                      product.images[0] &&
                      product.images[0].url
                }
                className="prod-image"
              />
            </ProductLink>
          </>
        )}
      </div>

      <div className="name">
        {product.subName && <div className="subname">{product.subName}</div>}

        <ProductLink product={product}>{item.name}</ProductLink>
      </div>
      <div className="qty">{item.quantity}</div>
      <div className="price">
        <Price price={item.total} currency={currency} />
      </div>
      {isVariant && (
        <div className="attributes">
          {variantNamesValues.map(v => (
            <span key={v} className={variantValue}>
              {v}
            </span>
          ))}
        </div>
      )}
    </li>
  ) : (
    <p style={{ margin: '1em 0 1em 1em' }}>
      {t('Product no longer available.')}
    </p>
  );
}

const orderItem = css`
  display: grid;
  display: -ms-grid;
  -ms-grid-columns: 4rem 2fr 0.5fr 1fr;
  -ms-grid-rows: 1fr min-content;
  grid-template-columns: 4rem 2fr 0.5fr 1fr;
  grid-template-rows: 1fr min-content;
  padding: 1em;
  border-bottom: 1px solid ${theme.colors.tablegrey};
  grid-template-areas:
    'image name qty price'
    'image attributes attributes attributes';

  :last-child {
    border-bottom: none;
  }

  .image-wrapper {
    grid-area: image;
    -ms-grid-row: 1;
    -ms-grid-row-span: 2;
    -ms-grid-column: 1;
    padding-right: 1em;
  }

  .qty {
    grid-area: qty;
    -ms-grid-row: 1;
    -ms-grid-column: 3;
  }

  .price {
    grid-area: price;
    -ms-grid-row: 1;
    -ms-grid-column: 4;
    text-align: right;
  }

  .attributes {
    grid-area: attributes;
    -ms-grid-row: 2;
    -ms-grid-column: 2;
    -ms-grid-column-span: 3;
  }

  .name {
    grid-area: name;
    -ms-grid-row: 1;
    -ms-grid-column: 2;
    line-height: 1.25;
    .subname {
      color: ${theme.colors.mediumgrey};
    }
    a {
      color: ${theme.colors.darkgrey};
      :hover {
        opacity: 0.8;
      }
    }
  }

  .variant-value {
    font-size: 0.875em;
    padding-right: 0.5em;
    padding-left: 0.5em;
    border-right: 1px solid ${theme.colors.tablegrey};
    :last-of-type {
      border-right: 0;
      padding-right: 0;
    }
    :first-of-type {
      padding-left: 0;
    }
  }
`;

export function ListDetail({ id, className }) {
  const { loading, error, order } = useOrderDetailQuery({
    query: OrderDetail,
    id
  });

  if (loading)
    return (
      <div className={cx(fullDetail, 'loading', className)}>
        <ListDetailHeader />
        {t('Loading more data…')}
      </div>
    );

  if (error)
    return (
      <div className={cx(fullDetail, 'error', className)}>
        {t.rich(
          'Something went wrong when retrieving order {id}. Please try again later.',
          { id }
        )}
      </div>
    );

  return (
    <section className={cx(fullDetail, className)}>
      <ListDetailHeader />
      <ul>
        {order.items.map(item => (
          <OrderItem
            item={item}
            key={item.articleNumber}
            currency={order.currency.format}
          />
        ))}
      </ul>

      <OrderTotals
        total={order.total}
        delivery={order.deliveryMethod}
        currency={order.currency.format}
      />

      <ShippingPayment
        deliveryInfo={order.deliveryInfo}
        billingInfo={order.billingInfo}
        paymentMethod={order.paymentMethod}
      />
    </section>
  );
}
