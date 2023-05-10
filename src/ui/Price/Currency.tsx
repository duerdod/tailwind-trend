import ChannelContext from '@jetshop/core/components/ChannelContext';
import t from '@jetshop/intl';
import { useContext } from 'react';

// Formats the given number in the currency of the selected channel
export const Currency: React.FC<{
  value: number;
  /** Currency to use instead of selected channel */
  currency?: { code: string; culture: string };
}> = function Currency({ value, currency }) {
  const { selectedChannel } = useContext(ChannelContext);

  return currency
    ? t.number(value, currency.code, currency.culture)
    : t.number(
        value,
        selectedChannel.currency.name,
        selectedChannel.language.culture
      );
};
