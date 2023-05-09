import { CustomerUpdateFormProvider } from '@jetshop/core/components/Auth/CustomerUpdateForm';
import t from '@jetshop/intl';
import React, { useState } from 'react';
import { GlobalError } from '../Forms/GlobalError';
import { RadioGroupWithLabels } from '../ui/RadioGroupWithLabels';
import customerProfileQuery from './customerProfileQuery.gql';
import { BlockTitle, ButtonContainer, PrimaryButton } from './ProfilePage';
import { Success } from '../Forms/Success';

export function Newsletter() {
  const [success, setSuccess] = useState(false);

  return (
    <div className="block" id="newsletter">
      <BlockTitle>{t('Newsletters')}</BlockTitle>
      <CustomerUpdateFormProvider
        customerProfileQuery={customerProfileQuery}
        onSubmit={() => {
          setSuccess(false);
        }}
        onSubmitSuccess={() => {
          setSuccess(true);
        }}
        render={({ isSubmitting, isValid, values, status }) => (
          <>
            <RadioGroupWithLabels
              name="preferences.type.acceptsEmail"
              items={[
                {
                  label: t('I want newsletters'),
                  value: true
                },
                {
                  label: t("I don't want newsletters"),
                  value: false
                }
              ]}
            />

            {status && status.globalError && (
              <GlobalError style={{ marginBottom: '2em' }}>
                {status.globalError}
              </GlobalError>
            )}

            {success && (
              <Success style={{ marginBottom: '2em' }}>
                {t('Your preferences have been updated.')}
              </Success>
            )}

            <ButtonContainer>
              <PrimaryButton type="submit" disabled={isSubmitting || !isValid}>
                {t(isSubmitting ? 'Hold on a moment…' : 'Save')}
              </PrimaryButton>
            </ButtonContainer>
          </>
        )}
      />
    </div>
  );
}
