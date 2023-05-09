import {
  ForgotPasswordProvider,
  useForgotPasswordData
} from '@jetshop/core/components/Auth/ForgotPasswordProvider';
import Head from '@jetshop/core/components/Head';
import t from '@jetshop/intl';
import React from 'react';
import { GlobalError } from '../Forms/GlobalError';
import Input from '../Forms/Input';
import ButtonWithLoading from '../ui/Button';
import { smallCaps } from '../ui/Headings';
import { activeSegment, smallSection } from './UI/Form';
import MaxWidth from '../Layout/MaxWidth';
import { cx } from 'linaria';

export default function ForgotPasswordPage() {
  return (
    <MaxWidth style={{ alignItems: 'center', marginTop: '2em' }}>
      <ForgotPasswordProvider>
        <section className={cx(smallSection, activeSegment)}>
          <h1 className={smallCaps}>{t(`Forgot password`)}</h1>
          <Head data={{ title: 'Forgot Password' }} />
          <ForgotPasswordForm />
        </section>
      </ForgotPasswordProvider>
    </MaxWidth>
  );
}

function ForgotPasswordForm() {
  const { submitted, isSubmitting, globalError, isValid, emailInputProps } =
    useForgotPasswordData();

  if (submitted) {
    return (
      <p style={{ lineHeight: 1.5 }}>
        {t(
          `Your password reset request has been submitted. Check your email for a link to reset your password.`
        )}
      </p>
    );
  }

  return (
    <>
      <Input label={t('What is your email address?')} {...emailInputProps} />

      {globalError && (
        <GlobalError style={{ marginBottom: '1em' }}>{globalError}</GlobalError>
      )}

      <ButtonWithLoading
        loading={isSubmitting}
        type="submit"
        disabled={!isValid}
      >
        {t('Submit')}
      </ButtonWithLoading>
    </>
  );
}
