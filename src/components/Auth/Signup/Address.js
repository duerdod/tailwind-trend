import useAddressFields from '@jetshop/core/components/Auth/useAddressFields';
import t from '@jetshop/intl';
import { CountriesInput } from '@jetshop/ui/Auth/FormFields/CountriesInput';
import { css, cx } from 'linaria';
import React from 'react';
import Input, { Label } from '../../Forms/Input';
import { PID } from './PID';
import { CustomerType } from './CustomerType';
import { SmallCaps } from '../../ui/Headings';
import { activeSegment } from '../UI/Form';

const sectionStyle = css`
  margin-top: 2em;
`;

export default function Address(props) {
  const { fields, setCountryByCode, countries } = useAddressFields();

  function focusSection() {
    // Used to add a highlight to this section when it is active
    if (!props.isActive) props.setActiveSection('address');
  }

  return (
    <section
      className={cx(
        'section',
        props.isActive ? 'active' : null,
        sectionStyle,
        activeSegment
      )}
    >
      <SmallCaps className="heading">{t('Contact Details')}</SmallCaps>

      <p>
        {t(
          'Please fill in your contact details for shipping and communication.'
        )}
      </p>

      <CustomerType />

      <div style={{ marginBottom: '2em' }}>
        <Label htmlFor="country">Country</Label>
        <CountriesInput
          onFocus={focusSection}
          name="country"
          onChange={e => setCountryByCode(e.currentTarget.value)}
          countries={countries}
        />
      </div>

      <PID />

      {fields.map(field => {
        // Map over billingAddressFields and display them
        return <Input onFocus={focusSection} {...field.inputProps} />;
      })}
    </section>
  );
}
