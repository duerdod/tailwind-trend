import t from '@jetshop/intl';
import { Currency } from '@jetshop/ui/Price/Currency';
import { css, cx } from 'linaria';
import React from 'react';
import { Price } from '@jetshop/ui/Price';
import { theme } from '../../../Theme';
import { useChannelSettings } from '@jetshop/core/hooks/Channels/useChannelSettings';

export function OrderTotals({ total, delivery, currency, className, ...rest }) {
  const { pricesIncVat } = useChannelSettings();
  const { tracking } = delivery;

  return (
    <section className={cx(className, styles)} {...rest}>
      <dl>
        <dt>{t('Delivery:')}</dt>{' '}
        <dd>
          ({delivery.name}) <Price price={delivery.fee} currency={currency} />
        </dd>
        {tracking && (
          <>
            <dt>{t('Track delivery:')}</dt>
            <dd>
              <a href={tracking.trackingUrl} target="new">
                {tracking.trackingUrlText}
              </a>
            </dd>
          </>
        )}
        <dt>{pricesIncVat ? t('Total incl. VAT') : t('Total excl. VAT')}</dt>{' '}
        <dd className="total-price">
          <Price price={total} currency={currency} />
        </dd>
        <dt>{pricesIncVat ? t('of which VAT') : t('+ VAT')}:</dt>{' '}
        <dd>
          <Currency value={total.vat} currency={currency} />
        </dd>
      </dl>
    </section>
  );
}

const styles = css`
  text-align: right;
  padding: 1em;
  border-top: 1px solid ${theme.colors.tablegrey};

  dl {
    display: flex;
    flex-wrap: wrap;
    max-width: 23rem;
    margin-left: auto;
    line-height: 1.5;

    div {
      display: inline-block;
    }
  }
  dt {
    flex: 1 1 50%;
  }
  dd {
    flex: 1 1 50%;

    a {
      color: ${theme.colors.blue};
      :hover {
        opacity: 0.8;
      }
    }
  }

  .total-price {
    font-weight: bold;
  }
`;
