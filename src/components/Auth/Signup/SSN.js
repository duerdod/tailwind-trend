import t from '@jetshop/intl';
import SSN from '@jetshop/ui/Auth/SSN';
import { TrendButton } from '@jetshop/ui/Button';
import { cx } from 'linaria';
import { Form } from 'formik';
import React from 'react';
import Input from '../../Forms/Input';

/**
 * This is unused in its current form, but will be used once SSN lookup is
 * supported by Flight.
 */
export default function SSNSection(props) {
  function handleFocus() {
    if (!props.isActive) props.setActiveSection('ssn');
  }

  return (
    <SSN
      onSuccess={() => {
        props.setActiveSection('address');
      }}
    >
      {({ formik }) => (
        <section className={cx('section', props.isActive ? 'active' : null)}>
          <Form aria-describedby="ssn-description">
            <h1 className="heading">{t('Create profile')}</h1>
            <p>
              {t(
                'Welcome to our online store! Enter your Social Security and we will try to fetch the required information. You can also fill it in manually.'
              )}
            </p>
            <Input
              type="text"
              name="ssn"
              label={t('Social Security Number')}
              onFocus={handleFocus}
            />
            <TrendButton
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
              onClick={formik.handleSubmit}
            >
              {formik.isSubmitting
                ? t('Hold on a moment…')
                : t('Look up my info')}
            </TrendButton>
            <div id="ssn-description" className="hint">
              {t('Or scroll down to fill in the rest manually')}
            </div>
          </Form>
        </section>
      )}
    </SSN>
  );
}
