import ChannelContext from '@jetshop/core/components/ChannelContext';
import LargeSelector from '@jetshop/ui/ChannelSelector/LargeSelector';
import { ModalTrigger } from '@jetshop/ui/Modal/ModalTrigger';
import React, { useContext } from 'react';
import { css } from 'linaria';
import Selector from './Selector';
import { styled } from 'linaria/react';

const Button = styled('button')`
  all: unset;
  cursor: pointer;
  span:hover {
    color: black;
    text-decoration: underline;
  }
`;

const modalStyles = css`
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: fixed;
  background: white;
  padding: 1rem;
  outline: none;
`;

const ChannelSelectorModal = props => {
  const { selectedChannel, channels, updateChannel, selectedChannelGroup } =
    useContext(ChannelContext);
  return (
    <ModalTrigger
      modalStyles={modalStyles}
      target={props => (
        <Selector
          channels={selectedChannelGroup || channels}
          selectedChannel={selectedChannel}
          updateChannel={updateChannel}
          type={LargeSelector}
          {...props}
        />
      )}
    >
      {({ showTarget }) => (
        <Button
          onClick={() => {
            props.hideMobileMenu();
            showTarget();
          }}
          {...props}
        >
          <img
            src={`https://countryflags.jetshop.io/${selectedChannel.country.code}/flat/32.png`}
            alt="Country Flag"
            style={{ height: '12px', marginRight: '6px' }}
            width="16"
            height="12"
          />
          <span>{selectedChannel.country.name}</span>
        </Button>
      )}
    </ModalTrigger>
  );
};

export default ChannelSelectorModal;
