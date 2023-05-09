import t from '@jetshop/intl';

const fields = {
  InvalidValue: {
    Pid: t('PID is invalid'),
    EmailAddress: t('Email address is invalid.'),
    PostalCode: t('Postal code is invalid.')
  },
  UniqueValueAlreadyExists: {
    Pid: t('This PID is already registered'),
    EmailAddress: t('Your email address is already registered.')
  },
  Required: {
    Pid: t('PID is required'),
    EmailAddress: t('Email address is required.'),
    PostalCode: t('Postal code is required.')
  }
};

export function useSignupValidation(validationDetails) {
  if (!validationDetails) {
    return null;
  }

  const [field, validation] = validationDetails;

  if (!fields?.[validation]?.[field]) {
    return t('Something went wrong. Please try again.');
  }

  return fields[validation][field];
}
