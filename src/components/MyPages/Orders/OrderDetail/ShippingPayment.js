import t from '@jetshop/intl';
import React from 'react';
import { css } from 'linaria';
import { theme } from '../../../Theme';
import { Contact } from './Contact';

export function ShippingPayment({ deliveryInfo, billingInfo, paymentMethod }) {
  return (
    <section className={shippingAndPayment}>
      <div className="shipping-billing">
        <Contact contactInfo={deliveryInfo} title="Shipping Info" />
        <Contact contactInfo={billingInfo} title="Billing Info" />
      </div>
      {paymentMethod && (
        <section className="payment-method">
          <h3>{t('Payment method')}</h3>
          {paymentMethod.name}
        </section>
      )}
    </section>
  );
}
const shippingAndPayment = css`
  display: flex;
  border-top: 1px solid ${theme.colors.tablegrey};

  ${theme.below.md} {
    flex-direction: column;
  }

  .shipping-billing {
    flex: 0 0 50%;
    display: flex;

    > *:first-child {
      margin-right: 4em;
    }
  }

  .payment-method {
    padding: 1em;
    border-left: 1px solid ${theme.colors.tablegrey};
  }
`;
