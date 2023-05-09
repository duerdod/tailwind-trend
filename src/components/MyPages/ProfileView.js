import React, { useMemo } from 'react';
import t from '@jetshop/intl';
import { useCustomerQuery } from '@jetshop/core/components/Auth/useCustomer';
import { ButtonContainer, WhiteButton } from './ProfilePage';
import customerProfileQuery from './customerProfileQuery.gql';

export const ProfileView = ({ setEditing }) => {
  const { customer, billingAddress } = useCustomerQuery({
    query: customerProfileQuery
  });

  const firstName =
    customer && customer.billingAddress && customer.billingAddress.firstName;
  const lastName =
    customer && customer.billingAddress && customer.billingAddress.lastName;

  const profileFields = useMemo(
    () =>
      billingAddress.filter(({ name, value }) => {
        // Skip displaying the following fields when iterating through all billing address fields
        const blacklist = [
          'firstName',
          'lastName',
          'email',
          'emailAddress',
          'country',
          'countryCode'
        ];
        if (blacklist.indexOf(name) !== -1) {
          return false;
        }
        return true;
      }),
    [billingAddress]
  );

  return (
    <>
      <dl className={'profile-form'}>
        <dt>{t('Name')}</dt>
        <dd>
          {firstName} {lastName}
        </dd>
        <dt>{t('Email address')}</dt>
        <dd>{customer && customer.email}</dd>
        {profileFields.map(({ id, value, label }) => (
          <React.Fragment key={id}>
            <dt>{label}</dt>
            <dd>{value || t('n/a')}</dd>
          </React.Fragment>
        ))}
      </dl>

      <ButtonContainer>
        <WhiteButton onClick={() => setEditing(true)} secondary>
          {t('Update information')}
        </WhiteButton>
      </ButtonContainer>
    </>
  );
};
