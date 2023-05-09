import t from '@jetshop/intl';
import { ErrorMessage, Field } from 'formik';
import { cx } from 'linaria';
import { styled } from 'linaria/react';
import React, { useState } from 'react';
import {
  InputError,
  InputPositive,
  ToggleViewPasswordButton
} from './InputStatus';

const Input = styled('input')`
  height: 40px;
  background: #fcfcfc;
  border: 1px solid #dedede;
  font-weight: 600;
  font-size: 16px;
  padding: 10px;
  width: 100%;
  margin-bottom: 0.25rem;
  padding-right: 40px;

  &.disabled {
    background: #ffffff;
    color: #808080;
  }
`;

export const Wrapper = styled('div')`
  margin-bottom: 1.5rem;
`;

export const ErrorSpan = styled('span')`
  font-style: italic;
  font-size: 12px;
  color: #eb0000;
  position: absolute;
`;

export const Label = styled('label')`
  display: block;
  font-size: 12px;
  margin-bottom: 0.25rem;
  display: block;
  .req {
    color: #707070;
    margin-left: 0.5em;
  }
  &.disabled {
    color: #808080;
  }
`;

const InputWithLabel = ({
  label,
  disabled,
  error,
  success,
  warning,
  loading,
  name,
  required,
  type,
  disableValidation,
  ...props
}) => {
  const [currentType, setType] = useState(type);
  return (
    <Wrapper className={props.wrapperClassName}>
      <Label className={cx(disabled && 'disabled')} htmlFor={name}>
        <span>{label || name}</span>
        {required && <span className="req">{t('(Required)')}</span>}
      </Label>
      <Field className={cx(disabled && 'disabled')} id={name} name={name}>
        {({ field, form: { touched, errors } }) => (
          <div>
            <Input
              {...props}
              {...field}
              id={name}
              disabled={disabled}
              type={currentType}
            />
            {type === 'password' && (
              <ToggleViewPasswordButton
                className={currentType === 'password' ? 'hidden' : 'visible'}
                onClick={() => {
                  currentType === 'password'
                    ? setType('text')
                    : setType('password');
                }}
              />
            )}
            {!disableValidation && (
              <>
                {touched?.field?.name && errors?.field?.name && <InputError />}
                {touched?.field?.name && !errors?.field?.name && (
                  <InputPositive />
                )}
              </>
            )}
          </div>
        )}
      </Field>
      {!disableValidation && <ErrorMessage name={name} component={ErrorSpan} />}
    </Wrapper>
  );
};

export default InputWithLabel;
