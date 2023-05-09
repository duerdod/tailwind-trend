import React, { useContext } from 'react';
import ChannelContext from '@jetshop/core/components/ChannelContext';
import { createSelectedChannel } from '@jetshop/core/components/ChannelContext/utils';

const LanguageSelector = () => {
  const { channels, updateChannel } = useContext(ChannelContext);
  return (
    <div>
      {channels.map(channel => (
        <button
          onClick={() => {
            const selectedChannel = createSelectedChannel(channel);
            updateChannel(selectedChannel);
          }}
        >
          {channel.name}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
