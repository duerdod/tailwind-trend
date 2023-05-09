import { SignupContext } from '@jetshop/core/components/Auth/signup-context';
import Input from '../../Forms/Input';
import React, { useContext } from 'react';

export function PID() {
  const { allFields } = useContext(SignupContext);

  const pid = allFields.find(
    field => field.id === 'pid' || field.id === 'organizationNumber'
  );

  if (!pid) return null;

  return (
    <Input
      type={pid.type}
      name={pid.name}
      label={pid.label}
      required={pid.required}
    />
  );
}
