import SignupFormProvider from '@jetshop/core/components/Auth/SignupFormContainer';
import useAuth from '@jetshop/core/components/AuthContext/useAuth';
import t from '@jetshop/intl';
import React, { useState } from 'react';
import { styled } from 'linaria/react';
import { cx } from 'linaria';
import { Redirect } from 'react-router';
import BaseMaxWidth from '../../Layout/MaxWidth';
import LoadingPage from '../../LoadingPage';
import { smallCaps } from '../../ui/Headings';
import { smallSection } from '../UI/Form';
import Address from './Address';
import LoginFields from './LoginFields';
import { useShopConfig } from '@jetshop/core/hooks/useShopConfig';
import { Intl } from '@jetshop/intl';
import Head from '@jetshop/core/components/Head';

import { theme } from '../../Theme';

const MaxWidth = styled(BaseMaxWidth)`
  align-items: center;

  p {
    line-height: 1.5;
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }

  button {
    width: 100%;
    max-width: 100%;
  }

  .hint {
    margin-top: 0.5rem;
    font-style: italic;
    font-size: 0.75rem;
    text-align: center;
  }

  .section {
    &:before {
      opacity: 0;
    }
    margin-bottom: 2rem;
    transition: opacity 0.6s ease;
    opacity: 0.5;

    &.active {
      opacity: 1;
      &:before {
        opacity: 1;
      }
    }
  }
`;

const Spacer = styled('div')`
  border-bottom: 2rem solid ${theme.colors.background};
`;

function SignUpPage() {
  const [activeSection, setActiveSection] = useState('address');
  const { loggedIn } = useAuth();
  const { routes } = useShopConfig();

  if (loggedIn) {
    return <Redirect to={routes.myPages.path} />;
  }

  return (
    <SignupFormProvider LoadingComponent={<LoadingPage />}>
      <MaxWidth style={{ marginTop: '2em' }}>
        <Intl>{t => <Head data={{ title: t('Signup') }} />}</Intl>
        <section className={smallSection}>
          <h1 className={cx('heading', smallCaps)}>Sign up</h1>
          <p>
            {t(
              'Welcome to our online store! We need to create a profile before you continue.'
            )}
          </p>

          <div onClick={() => setActiveSection('address')}>
            <Address
              isActive={activeSection === 'address'}
              setActiveSection={setActiveSection}
            />
          </div>

          <Spacer />

          <div onClick={() => setActiveSection('loginFields')}>
            <LoginFields
              isActive={activeSection === 'loginFields'}
              setActiveSection={setActiveSection}
            />
          </div>
        </section>
      </MaxWidth>
    </SignupFormProvider>
  );
}

export default SignUpPage;
