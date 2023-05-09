import { useIntl } from '@jetshop/intl';
import { useReducer } from 'react';

export function useProductValidationMessage({
  missingOptions,
  variantValidation,
  hasVariants,
  stockStatus
}) {
  const t = useIntl();
  // Track submits, so we can enable after the first one
  const [submitCount, enableValidation] = useReducer(count => count + 1, 0);

  let validationMessage = null;

  if (submitCount > 0) {
    if (missingOptions?.length > 0) {
      validationMessage = t(`Select { option }`, {
        option: missingOptions[0].name
      });
    }
  }

  if (
    (!validationMessage && variantValidation === 'outOfStock') ||
    (!hasVariants && stockStatus.status === 'outOfStock')
  ) {
    validationMessage = t('Out of stock');
  }

  return {
    enableValidation,
    validationMessage
  };
}
