import React from 'react';
import { cx } from 'linaria';
import t from '@jetshop/intl';

export function Contact({ contactInfo, title, className, ...rest }) {
  if (!contactInfo) return null;

  const { address } = contactInfo;

  return (
    <section
      style={{ padding: '1em', lineHeight: 1.5 }}
      className={cx(className)}
      {...rest}
    >
      <h2>{title}</h2>
      <div>
        {contactInfo.firstName} {contactInfo.lastName}
      </div>

      {address && (
        <>
          <div>{address.street}</div>
          <div>
            {address.postcode} {address.city}
          </div>
          {address.country && <div>{address.country.name}</div>}
        </>
      )}

      {contactInfo.phone && (
        <>
          <strong>{t('Phone:')}</strong> {contactInfo.phone}
        </>
      )}
    </section>
  );
}
