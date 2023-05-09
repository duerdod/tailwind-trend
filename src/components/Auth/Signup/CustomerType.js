import { SignupContext } from '@jetshop/core/components/Auth/signup-context';
import t from '@jetshop/intl';
import CheckboxGroup from '@jetshop/ui/Checkbox/CheckboxGroup';
import React, { useContext } from 'react';
import { css } from 'linaria';

const checkboxWrapStyle = css`
  margin-bottom: 1em;
  display: flex;
  label {
    justify-content: flex-start;
    align-items: center;
    + label {
      margin-left: 1.5em;
    }
  }
`;

// Checkbox group variables
const items = [
  { label: t('Private'), val: 'private' },
  { label: t('Company'), val: 'company' }
];

export function CustomerType() {
  const { isUserTypeBusiness, setIsUserTypeBusiness } = useContext(
    SignupContext
  );

  function handleChange(type) {
    setIsUserTypeBusiness(type === 'company');
  }

  const selectedItem = !isUserTypeBusiness ? items[0].val : items[1].val;

  return (
    <CheckboxGroup
      items={items}
      selectedItem={selectedItem}
      handleChange={handleChange}
      className={checkboxWrapStyle}
    />
  );
}
