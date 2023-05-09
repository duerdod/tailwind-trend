import ChannelContext from '@jetshop/core/components/ChannelContext';
import { FlyoutTarget, FlyoutTrigger } from '@jetshop/ui/Modal/Flyout';
import React, { useContext } from 'react';
import Selector from './Selector';
import { styled } from 'linaria/react';

const Flyout = styled('div')`
  background-color: white;
  position: absolute;
  z-index: 5;
  top: calc(100% + ((54px - 100%) / 2));
`;

const CountryFlag = styled('img')`
  height: 12px;
  width: 12px;
  margin-right: 5px;
`;

export default function HeaderChannelSelector() {
  const { selectedChannel, channels, updateChannel, selectedChannelGroup } =
    useContext(ChannelContext);
  return (
    <>
      <FlyoutTrigger id="channel-selector">
        {({ showTarget, hideTarget, isOpen }) => (
          <button
            data-testid="channel-selector-button"
            onClick={isOpen ? hideTarget : showTarget}
            style={{ background: 'transparent' }}
          >
            <CountryFlag
              src={`https://countryflags.jetshop.io/${selectedChannel.country.code}/flat/32.png`}
              alt="Country Flag"
              width="16"
              height="12"
            />
            {selectedChannel.country.name}
          </button>
        )}
      </FlyoutTrigger>
      <FlyoutTarget id="channel-selector">
        {({ isOpen, hideTarget }) => (
          <Flyout>
            <Selector
              channels={selectedChannelGroup || channels}
              hideTarget={hideTarget}
              selectedChannel={selectedChannel}
              updateChannel={updateChannel}
            />
          </Flyout>
        )}
      </FlyoutTarget>
    </>
  );
}
