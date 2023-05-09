import { UpdatePasswordProvider } from '@jetshop/core/components/Auth/UpdatePasswordForm';
import t from '@jetshop/intl';
import React from 'react';
import { smallSection } from '../Auth/UI/Form';
import { GlobalError } from '../Forms/GlobalError';
import InputWithLabel from '../Forms/Input';
import { Success } from '../Forms/Success';
import { BlockTitle, PrimaryButton } from './ProfilePage';
import Head from '@jetshop/core/components/Head';
import { Intl } from '@jetshop/intl';

function ChangePassword() {
  return (
    <>
      <Intl>{t => <Head data={{ title: t('Change Password') }} />}</Intl>

      <section className="main-wrapper">
        <div className="block" id="change-password">
          <BlockTitle>{t('Change password')}</BlockTitle>
          <UpdatePasswordProvider
            render={({
              isSubmitting,
              isValid,
              submitted,
              globalError,
              inputProps
            }) => (
              <section className={smallSection}>
                <InputWithLabel
                  {...inputProps.oldPassword}
                  label={t('Old password')}
                />
                <InputWithLabel
                  {...inputProps.newPassword}
                  label={t('New password')}
                />
                <InputWithLabel
                  {...inputProps.repeatPassword}
                  label={t('New password again')}
                />

                {globalError && (
                  <GlobalError style={{ marginBottom: '2em' }}>
                    {globalError}
                  </GlobalError>
                )}

                {submitted && (
                  <Success style={{ marginBottom: '2em' }}>
                    {t('Your password has been successfully updated.')}
                  </Success>
                )}

                <PrimaryButton
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  data-testid="save-password-button"
                >
                  {t('Save')}
                </PrimaryButton>
              </section>
            )}
          />
        </div>
      </section>
    </>
  );
}

export default ChangePassword;
