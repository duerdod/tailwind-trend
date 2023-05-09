import { styled } from 'linaria/react';
import React from 'react';
import { useStockNotifications } from '@jetshop/core/hooks/Subscriptions/useStockNotifications';
import { useIntl } from '@jetshop/intl';
import { theme } from '../../Theme';
import UIButton from '../../ui/Button';

const Button = styled(UIButton)`
  background: ${theme.colors.black};
  width: 100%;
  margin-bottom: 20px;
`;

const Error = styled('p')`
  color: #eb5757;
  font-size: 0.875rem;
  position: absolute;
  top: 50px;
`;

const Form = styled.form`
  display: flex;
  border: 1px solid #bfbdbd;
  padding: 0 0.5rem;
  position: absolute;
  top: 0;
  width: 100%;
  opacity: 1;

  &:disabled {
    opacity: 0.5;
  }

  input {
    flex: 1 1 auto;
  }

  input,
  button {
    height: 3rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 1rem;
    border: 0;
    padding: 0 0.25rem;
    :focus {
      outline: none;
    }
  }

  button {
    justify-content: center;
  }
`;

const Wrapper = styled('div')`
  position: relative;
  width: 100%;

  [data-visible='false'] {
    transform: scaleY(0);
  }
  [data-visible='true'] {
    transform: scaleY(1);
  }

  [data-visible='true'],
  [data-visible='false'] {
    transition: transform 0.1s linear;
  }
`;

const Completed = styled.div`
  position: absolute;
  top: 0;
  font-weight: 600;
  height: 3rem;
  display: flex;
  align-items: center;
`;

function NotifyWhenBack({ articleNumber }) {
  const {
    toggle,
    submit,
    inputProps,
    active,
    inactive,
    submitting,
    submitted,
    failed
  } = useStockNotifications({ articleNumber });

  const t = useIntl();
  const disabled = inputProps.value.length === 0 || submitting;

  return (
    <>
      <Wrapper>
        <div className="toggle-button" data-visible={inactive}>
          <Button onClick={toggle} data-testid="notify-when-back-button">
            {t('Notify me when back in stock')}
          </Button>
        </div>
        {failed && (
          <Error>
            {t('Something went wrong. Please check your email and try again.')}
          </Error>
        )}
        <Form
          onSubmit={submit}
          data-visible={active || failed}
          disabled={disabled}
        >
          <input
            type="email"
            id="stock-notifications"
            data-testid="notify-when-back-input"
            aria-label={t('E-mail address')}
            placeholder={t('E-mail address')}
            required
            {...inputProps}
          />
          <button data-testid="notify-when-back-ok" disabled={disabled}>
            {t('OK')}
          </button>
        </Form>
        <Completed data-visible={submitted}>
          <p data-testid="notify-when-back-success">
            {t('You are now subscribed.')}
          </p>
        </Completed>
      </Wrapper>
    </>
  );
}

export default NotifyWhenBack;
