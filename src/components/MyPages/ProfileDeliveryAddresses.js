import React, { useRef, useState, useMemo } from 'react';
import { useCustomerQuery } from '@jetshop/core/components/Auth/useCustomer';
import customerProfileQuery from './customerProfileQuery.gql';
import t from '@jetshop/intl';
import {
  BlockTitle,
  ButtonContainer,
  PrimaryButton,
  WhiteButton
} from './ProfilePage';
import { styled } from 'linaria/react';
import { CustomerUpdateFormProvider } from '@jetshop/core/components/Auth/CustomerUpdateForm';
import { smallSection } from '../Auth/UI/Form';
import InputWithLabel, { Label, Wrapper } from '../Forms/Input';
import { CountriesInput } from '@jetshop/ui/Auth/FormFields/CountriesInput';
import { GlobalError } from '../Forms/GlobalError';

const Container = styled('div')`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  margin-left: -0.75rem;
  margin-right: -0.75rem;
`;

const DeliveryAddressEdit = ({ setEditing, addressId }) => (
  <CustomerUpdateFormProvider
    deliveryAddressId={addressId}
    customerProfileQuery={customerProfileQuery}
    onSubmitSuccess={() => setEditing(false)}
    render={({
      values,
      isSubmitting,
      deliveryAddressFields,
      setCountryCode,
      isValid,
      status,
      countries
    }) => {
      const deliveryAddressIndex = values.deliveryAddresses.findIndex(
        a => a.id === addressId
      );
      const key = `deliveryAddresses[${deliveryAddressIndex}]`;
      return (
        <section className={smallSection}>
          <Wrapper>
            <Label disabled={isSubmitting} htmlFor={`${key}.countryCode`}>
              <span>{t('Country')}</span>
            </Label>
            <CountriesInput
              name={`${key}.countryCode`}
              label={t(`${key}.countryCode`)}
              disabled={isSubmitting}
              countries={countries}
              onChange={e => {
                setCountryCode(e.target.value);
              }}
            />
          </Wrapper>
          {deliveryAddressFields.map(({ inputProps }) => {
            return <InputWithLabel {...inputProps} disabled={isSubmitting} />;
          })}

          {status && status.globalError && (
            <GlobalError style={{ marginBottom: '2em' }}>
              {status.globalError}
            </GlobalError>
          )}

          <ButtonContainer>
            <WhiteButton onClick={() => setEditing(false)} secondary>
              {t('Cancel')}
            </WhiteButton>

            <PrimaryButton type="submit" disabled={isSubmitting || !isValid}>
              {t('Save')}
            </PrimaryButton>
          </ButtonContainer>
        </section>
      );
    }}
  />
);

const DeliveryAddressView = ({ address, setEditing }) => {
  const firstName = address.find(a => a.name === 'firstName').value;
  const lastName = address.find(a => a.name === 'lastName').value;

  const fields = useMemo(
    () =>
      address.filter(({ id }) => {
        // Skip displaying the following fields when iterating through delivery address fields
        const blacklist = ['firstName', 'lastName'];
        if (blacklist.indexOf(id) !== -1) {
          return false;
        }
        return true;
      }),
    [address]
  );

  return (
    <>
      <dl className={'profile-form'}>
        <dt>{t('Name')}</dt>
        <dd>
          {firstName} {lastName}
        </dd>
        {fields.map(({ label, id, value }) => (
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

const DeliveryAddressBlock = ({ addressId }) => {
  const { deliveryAddress } = useCustomerQuery({
    query: customerProfileQuery,
    deliveryAddressId: addressId
  });

  const [isEditing, setEditingState] = useState(false);
  const deliveryAddressBlockRef = useRef(null);

  function setEditing(nextState) {
    setEditingState(nextState);
    const $el = deliveryAddressBlockRef.current;
    if ($el && $el.scrollIntoView) {
      $el.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }

  return (
    <div className="block half-block" ref={deliveryAddressBlockRef}>
      {isEditing ? (
        <>
          <BlockTitle>{t('Delivery Address')}</BlockTitle>
          <DeliveryAddressEdit setEditing={setEditing} addressId={addressId} />
        </>
      ) : (
        <>
          <BlockTitle>{t('Delivery Address')}</BlockTitle>
          <DeliveryAddressView
            setEditing={setEditing}
            address={deliveryAddress}
          />
        </>
      )}
    </div>
  );
};

const ProfileDeliveryAddresses = () => {
  const { customer } = useCustomerQuery({
    query: customerProfileQuery
  });

  return customer &&
    customer.deliveryAddresses &&
    customer.deliveryAddresses.length > 0 ? (
    <Container>
      {customer.deliveryAddresses.map(({ id }, index) => (
        <DeliveryAddressBlock addressId={id} key={index} />
      ))}
    </Container>
  ) : null;
};

export default ProfileDeliveryAddresses;
