import { CustomerUpdateFormProvider } from '@jetshop/core/components/Auth/CustomerUpdateForm';
import { useCustomerQuery } from '@jetshop/core/components/Auth/useCustomer';
import Head from '@jetshop/core/components/Head';
import useLogError from '@jetshop/core/hooks/useLogError';
import t, { Intl } from '@jetshop/intl';
import { CountriesInput } from '@jetshop/ui/Auth/FormFields/CountriesInput';
import React, { useRef, useState } from 'react';
import { styled } from 'linaria/react';
import { GlobalError } from '../Forms/GlobalError';
import InputWithLabel, { Label, Wrapper } from '../Forms/Input';
import LoadingPage from '../LoadingPage';
import { smallCaps } from '../ui/Headings';
import customerProfileQuery from './customerProfileQuery.gql';
import { DeleteAccount } from './DeleteAccount';
import { Newsletter } from './Newsletter';
import ProfileDeliveryAddresses from './ProfileDeliveryAddresses';
import { ProfileView } from './ProfileView';

import { theme } from '../Theme';
import { smallSection } from '../Auth/UI/Form';

export const BlockTitle = styled('h3')`
  margin-bottom: 2rem;
`;

export const ButtonContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${theme.below.sm} {
    flex-direction: column;
  }
`;

export const PrimaryButton = styled('button')`
  height: 42px;
  padding: 0.5rem 1rem;
  border: 1px solid #dedede;
  ${theme.above.sm} {
    max-width: 204px;
  }
  ${theme.below.sm} {
    margin-bottom: 1rem;
  }
`;

export const WhiteButton = styled(PrimaryButton)`
  margin-right: 2rem;
  background-color: #f7f7f7;
`;

const ProfileEdit = ({ setEditing }) => {
  return (
    <>
      <CustomerUpdateFormProvider
        customerProfileQuery={customerProfileQuery}
        onSubmitSuccess={() => setEditing(false)}
        render={({
          values,
          isSubmitting,
          billingAddressFields,
          handleChange,
          setCountryCode,
          isValid,
          status,
          countries,
          pidField
        }) => {
          return (
            <section className={smallSection}>
              <Wrapper>
                <Label
                  disabled={isSubmitting}
                  htmlFor={'billingAddress.countryCode'}
                >
                  <span>{t('Country')}</span>
                </Label>
                <CountriesInput
                  name="billingAddress.countryCode"
                  disabled={isSubmitting}
                  countries={countries}
                  onChange={e => {
                    setCountryCode(e.target.value);
                  }}
                />
              </Wrapper>

              {pidField && (
                <InputWithLabel
                  type={pidField.type}
                  name={pidField.name}
                  label={pidField.label}
                  required={pidField.required}
                />
              )}

              {billingAddressFields.map(({ inputProps }) => {
                return (
                  <InputWithLabel {...inputProps} disabled={isSubmitting} />
                );
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

                <PrimaryButton
                  type="submit"
                  disabled={isSubmitting || !isValid}
                >
                  {t('Save')}
                </PrimaryButton>
              </ButtonContainer>
            </section>
          );
        }}
      />
    </>
  );
};

const InlineApolloErrorHandler = ({ refetch, error }) => {
  useLogError(true, error, 'InlineErrorHandler');

  return (
    <div>
      <p>Something went wrong.</p>
      <br />
      <p>
        <PrimaryButton onClick={() => refetch()}>Try again</PrimaryButton>
      </p>
    </div>
  );
};

const Profile = props => {
  const [isEditing, setEditingState] = useState(false);

  const profileBlockRef = useRef(null);

  function setEditing(nextState) {
    setEditingState(nextState);
    const $el = profileBlockRef.current;
    if ($el && $el.scrollIntoView) {
      $el.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }

  return (
    <div className="block" id="profile" ref={profileBlockRef}>
      <BlockTitle className={smallCaps}>{t('My profile')}</BlockTitle>
      {isEditing ? (
        <ProfileEdit setEditing={setEditing} />
      ) : (
        <ProfileView setEditing={setEditing} />
      )}
    </div>
  );
};

function ProfilePage() {
  const { loading, error, refetch } = useCustomerQuery({
    query: customerProfileQuery
  });

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <InlineApolloErrorHandler {...{ error, refetch }} />;
  }

  return (
    <>
      <Intl>{t => <Head data={{ title: t('My Profile') }} />}</Intl>

      <div className="main-wrapper">
        <Profile />
        <ProfileDeliveryAddresses />
        <Newsletter />
        <DeleteAccount />
      </div>
    </>
  );
}

export default ProfilePage;
