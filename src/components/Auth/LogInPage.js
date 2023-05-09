import LogInFormProvider from '@jetshop/ui/Auth/LogInFormProvider';
import t from 'format-message';
import React from 'react';
import { styled } from 'linaria/react';
import { css, cx } from 'linaria';
import { Link } from 'react-router-dom';
import { GlobalError } from '../Forms/GlobalError';
import Input from '../Forms/Input';
import MaxWidth from '../Layout/MaxWidth';
import TrendButton from '../ui/Button';
import { smallCaps } from '../ui/Headings';
import { activeSegment, smallSection } from './UI/Form';
import { useShopConfig } from '@jetshop/core/hooks/useShopConfig';
import { Intl } from '@jetshop/intl';
import Head from '@jetshop/core/components/Head';
import { Helmet } from 'react-helmet-async';

import { theme } from '../Theme';

const StyledTrendButton = styled(TrendButton)`
  align-self: center;
`;

const actionWrapper = css`
  border: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > * {
    flex: 1 1 calc(50% - 1em);
  }
`;

const TextLink = styled(Link)`
  text-decoration: none;
  color: ${theme.colors.blue};
  text-align: right;
  font-size: 0.875em;
  :hover {
    opacity: 0.8;
  }
  &.signup-link {
    margin-left: auto;
  }
`;

const LogInPageMaxWidth = styled(MaxWidth)`
  align-items: center;
  justify-content: flex-start;
  margin-top: 2rem;
`;

function LogInPage() {
  const { routes } = useShopConfig();
  return (
    <LogInPageMaxWidth>
      <Intl>{t => <Head data={{ title: t('Login') }} />}</Intl>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <LogInFormProvider redirect="my-pages">
        {({ globalError, isSubmitting, isValid }) => (
          <section className={cx(smallSection, activeSegment)}>
            <header
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '0.75rem'
              }}
            >
              <h1 className={smallCaps} style={{ marginBottom: 0 }}>
                {t('Login')}
              </h1>

              <TextLink to={routes.signup.path} className="signup-link">
                {t('Not yet a member? Sign Up')}
              </TextLink>
            </header>
            <Input type="email" name="email" label={t('E-mail address')} />
            <Input type="password" name="password" label={t('Password')} />

            {globalError && (
              <GlobalError style={{ marginBottom: '2em' }}>
                {globalError}
              </GlobalError>
            )}

            <section className={actionWrapper}>
              <StyledTrendButton
                type="submit"
                disabled={!isValid}
                loading={isSubmitting}
                loadingText={t('Hold on a moment...')}
              >
                {t('Log in')}
              </StyledTrendButton>
              <TextLink to={routes.forgotPassword.path}>
                {t('Forgot password?')}
              </TextLink>
            </section>
          </section>
        )}
      </LogInFormProvider>
    </LogInPageMaxWidth>
  );
}

export default LogInPage;
