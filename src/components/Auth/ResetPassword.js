import React from 'react';
import MaxWidth from '../Layout/MaxWidth';
import {
  useResetPasswordForm,
  ResetPasswordProvider
} from '@jetshop/core/components/Auth/ResetPasswordProvider';
import { smallSection } from './UI/Form';
import InputWithLabel from '../Forms/Input';
import t from '@jetshop/intl';
import ButtonWithLoading from '../ui/Button';
import { GlobalError } from '../Forms/GlobalError';
import Head from '@jetshop/core/components/Head';
import { Link } from 'react-router-dom';
import { useShopConfig } from '@jetshop/core/hooks/useShopConfig';

export default function ResetPasswordPage() {
  return (
    <ResetPasswordProvider>
      <ResetPassword />
    </ResetPasswordProvider>
  );
}

function ResetPassword(props) {
  const {
    globalError,
    passwordInputProps,
    isSubmitting,
    isValid,
    submitted
  } = useResetPasswordForm();
  const { routes } = useShopConfig();

  return (
    <MaxWidth style={{ alignItems: 'center', marginTop: '2em' }}>
      <Head data={{ title: 'Reset Password' }} />

      <section className={smallSection}>
        {submitted ? (
          <>
            <p>{t('Your password has been reset.')}</p>
            <p>
              {t.rich('You can now {login} with your new password', {
                login: <Link to={routes.login.path}>Log in</Link>
              })}
            </p>
          </>
        ) : (
          <>
            <InputWithLabel
              {...passwordInputProps}
              label={t('Please enter your new password')}
            />

            {globalError && (
              <GlobalError style={{ marginBottom: '1em' }}>
                {globalError}
              </GlobalError>
            )}

            <ButtonWithLoading
              loading={isSubmitting}
              type="submit"
              disabled={!isValid}
            >
              {t('Submit')}
            </ButtonWithLoading>
          </>
        )}
      </section>
    </MaxWidth>
  );
}
