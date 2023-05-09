import React from 'react';
import { Radio } from '@jetshop/ui/Checkbox/CheckboxGroup';
import { Field, ErrorMessage } from 'formik';
import { Wrapper, ErrorSpan } from '../Forms/Input';

export const RadioGroupWithLabels = ({ name, items }) => (
  <Wrapper>
    <Field
      name={name}
      render={({ field, form }) => (
        <>
          {items.map(({ id, value, label }) => (
            <Radio
              type="radio"
              key={id || `${name}${value}`}
              id={id || `${name}${value}`}
              label={label}
              {...field}
              value={value}
              checked={field.value === value}
              onChange={event => {
                // custom onChange handler to typecast boolean values
                if (typeof value === 'boolean') {
                  const newValue =
                    ['true', '1', 'yes', 'y', 'on'].indexOf(
                      event.target.value
                    ) !== -1;
                  form.setFieldValue(field.name, newValue);
                  return;
                }

                form.onChange(event);
              }}
            />
          ))}
        </>
      )}
    />
    <ErrorMessage name={name} component={ErrorSpan} />
  </Wrapper>
);
