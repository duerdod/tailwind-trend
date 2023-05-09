import { styled } from 'linaria/react';
import React from 'react';
import { useIntl } from '@jetshop/intl';
import { useNewsletterSubscription } from '@jetshop/core/hooks/Subscriptions/useNewsletterSubscription';
import { theme } from '../Theme';

const FieldErrorWrapper = styled('div')`
  ${theme.below.md} {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`;

const Wrapper = styled('div')`
  position: relative;
  width: 100%;
  max-width: 31rem;
  margin: 0 auto;
  background: white;
  height: 2.5rem;
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
  flex: 0 1 20rem;

  ${theme.above.md} {
    margin-bottom: 2rem;
  }
  form,
  input {
    height: 100%;
    width: 100%;
  }

  input {
    background: transparent;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 1rem;
    border: 1px solid #bfbdbd;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 16px;
  }
  label {
    position: absolute;
    font-size: 0.75rem;
    left: calc(0.5rem + 1px);
    top: -6px;
    background: white;
    padding: 0 0.5rem;
    color: ${theme.colors.darkerGrey};
  }
  button {
    color: ${theme.colors.black};
    background: none;
    border: 0;
    outline: none;
    position: absolute;
    right: 1rem;
    text-align: right;
    top: 0;
    height: 100%;
    cursor: pointer;
    &:disabled {
      opacity: 0.5;
    }
  }
`;

const Error = styled('div')`
  margin-bottom: 0.5rem;
  color: #650e1b;
`;

function NewsletterField() {
  const {
    inputProps,
    submit,
    submitting,
    submitted,
    failed,
    errorStates: { alreadySubscribed, invalidEmail }
  } = useNewsletterSubscription({
    enabled: true
  });

  const t = useIntl();
  const disabled = inputProps.value.length === 0 || submitting;

  return (
    <FieldErrorWrapper>
      <label htmlFor="newsletter">
        <h2>{t('Join the newsletter')}</h2>
      </label>
      <Error>
        {alreadySubscribed &&
          t('You have already subscribed to the newsletter!')}
        {invalidEmail || failed
          ? t('Something went wrong. Please check your email and try again.')
          : null}
      </Error>
      <Wrapper>
        {submitted ? (
          <p data-testid="newsletter-subscription-success">
            {t('You are now subscribed')}
          </p>
        ) : (
          <form onSubmit={submit} disabled={disabled}>
            <input
              type="email"
              id="newsletter"
              placeholder={t('Enter email address')}
              style={{ paddingRight: submitting ? '8rem' : '4rem' }}
              data-testid="newsletter-subscription-input"
              {...inputProps}
            />
            <button
              type="submit"
              disabled={disabled}
              data-testid="newsletter-subscription-submit"
            >
              {submitting ? t('Submitting…') : t('Submit')}
            </button>
          </form>
        )}
      </Wrapper>
    </FieldErrorWrapper>
  );
}

export default NewsletterField;
