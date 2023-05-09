import useFreeShippingCheck from '@jetshop/core/hooks/useFreeShippingCheck';
import t from '@jetshop/intl';
import { Price } from '@jetshop/ui/Price';
import { styled } from 'linaria/react';
import React from 'react';

const common = `
  line-height: 1.5;
  font-size: 0.85em;
  text-align: center;
  color: #828282;
`;

const UntilLimit = styled('div')`
  ${common};
  [data-flight-price] {
    display: inline;
    > * {
      display: inline;
    }
  }
`;

const Reached = styled('div')`
  ${common};
`;

function FreeShipping({ cartTotal, ...rest }) {
  const {
    hasMetLimit,
    untilLimit,
    freeShippingConfigured
  } = useFreeShippingCheck({
    cartTotal
  });

  if (!freeShippingConfigured) return null;

  if (!hasMetLimit)
    return (
      <UntilLimit key="until-limit">
        {t.rich(`Spend {price} more to qualify for free shipping!`, {
          price: <Price key="price" price={untilLimit} />
        })}
      </UntilLimit>
    );

  return (
    <Reached {...rest}>
      <h2>{t('Delivery')}</h2>
      <label>{t('Free for your order')}</label>
    </Reached>
  );
}

export default FreeShipping;
