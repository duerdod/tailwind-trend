import t from '@jetshop/intl';
import useLoginFields from '@jetshop/core/components/Auth/useLoginFields';
import useSignupForm from '@jetshop/core/components/Auth/useSignupForm';
import { TrendButton } from '@jetshop/ui/Button';
import { css, cx } from 'linaria';
import React from 'react';
import Input from '../../Forms/Input';
import { GlobalError } from '../../Forms/GlobalError';
import { SmallCaps } from '../../ui/Headings';
import { activeSegment } from '../UI/Form';
import { useSignupValidation } from './useSignupValidation';

const sectionStyle = css`
  margin-top: 2em;
`;

export default function LoginFields(props) {
  const { fields } = useLoginFields();
  const { isSignupError, validationDetails, isSubmitting } = useSignupForm();
  const validationMessage = useSignupValidation(validationDetails);

  function focusSection() {
    if (!props.isActive) props.setActiveSection('loginFields');
  }

  return (
    <section
      className={cx(
        'section',
        props.isActive ? 'active' : null,
        sectionStyle,
        activeSegment
      )}
    >
      <SmallCaps className="heading">{t('Email & Password')}</SmallCaps>

      {isSignupError && (
        <GlobalError style={{ marginBottom: '2em' }}>
          {validationMessage}
        </GlobalError>
      )}

      {fields.map(field => {
        return <Input {...field.inputProps} onFocus={focusSection} />;
      })}

      <TrendButton
        data-testid="sign-up-button"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? t('Hold on a moment…') : t('Create Profile')}
      </TrendButton>
    </section>
  );
}
