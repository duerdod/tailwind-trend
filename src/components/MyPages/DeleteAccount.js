import { useDeleteAccountMutation } from '@jetshop/core/hooks/useDeleteAccountMutation';
import { css, cx } from 'linaria';
import React from 'react';
import { GlobalError } from '../Forms/GlobalError';
import { BlockTitle, PrimaryButton } from './ProfilePage';
import { useIntl } from '@jetshop/intl';
import { Redirect } from 'react-router';
import { Formik, Form, Field } from 'formik';
import Checkbox from '@jetshop/ui/Checkbox';

const deleteAccount = css`
  button {
    width: auto;
  }
`;

function DeleteAccount() {
  const t = useIntl();

  const { confirmDeletion, error, success } = useDeleteAccountMutation({
    confirmationMessage: t('Are you sure?'),
  });

  // Redirect to root once account is deleted, and user is logged out
  if (success) return <Redirect to="/" />;

  return (
    <div className={cx('block', deleteAccount)} id="delete">
      <BlockTitle>{t('Delete Account')}</BlockTitle>
      <p>
        {t(`When your account is deleted, all order history will be erased.`)}
      </p>

      <Formik
        validate={(values) => {
          // Just check if confirm has been checked. If it is checked, the form becomes valid.
          if (!values.confirm) {
            return {
              confirm: '',
            };
          }
          return {};
        }}
        onSubmit={confirmDeletion}
        initialValues={{
          confirm: false,
        }}
      >
        {(formik) => {
          return (
            <Form>
              <Field
                name="confirm"
                render={({ field }) => {
                  return (
                    <div style={{ marginTop: '1em' }}>
                      <Checkbox
                        {...field}
                        label={t('I understand, please delete my account')}
                      />
                    </div>
                  );
                }}
              />
              <PrimaryButton
                type="submit"
                style={{ marginTop: '2em' }}
                disabled={!formik.isValid}
              >
                {t('Delete account')}
              </PrimaryButton>
            </Form>
          );
        }}
      </Formik>

      {error && <GlobalError style={{ margin: '2em 0' }}>{error}</GlobalError>}
    </div>
  );
}

export { DeleteAccount };
