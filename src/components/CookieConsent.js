import React, { useEffect, useState } from 'react';
import { styled } from 'linaria/react';
import t from '@jetshop/intl';
import { Link } from 'react-router-dom';
import Button from './ui/Button';
import { withCookies } from 'react-cookie';
import { useTracker } from '@jetshop/core/analytics/Analytics';

const animationLength = 800;

const Wrapper = styled('div')`
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  padding: 2rem;
  background-color: white;
  width: 24rem;
  max-width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  opacity: 0;
  animation-name: enter;
  animation-duration: ${animationLength}ms;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  z-index: 50;
  &.unmounting {
    animation-name: exit;
  }

  @keyframes enter {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes exit {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  a {
    display: block;
    margin-bottom: 1.5rem;
  }

  p {
    margin-bottom: 1rem;
  }

  button {
    width: 100%;
    height: 46px;
  }
`;

const CookieConsent = ({ cookies }) => {
  const { GoogleTrackingConsents } = cookies.cookies;

  const [visible, setVisible] = useState(!GoogleTrackingConsents);
  const [unmounting, setUnmounting] = useState(false);
  const track = useTracker();

  function agree() {
    setUnmounting(true);
    track({
      name: 'consent'
    });
    setTimeout(() => {
      setVisible(false);
    }, animationLength);
  }

  useEffect(() => {
    window.consent = agree;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return visible ? (
    <Wrapper className={unmounting ? 'unmounting' : ''}>
      <p>
        {t('This website uses cookies to ensure you get the best experience.')}
      </p>
      <Link to="/terms-and-conditions">{t('Learn more')}</Link>
      <Button onClick={agree}>{t('Got it!')}</Button>
    </Wrapper>
  ) : null;
};

export default withCookies(CookieConsent);
