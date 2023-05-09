import ChannelContext from '@jetshop/core/components/ChannelContext';
import t from '@jetshop/intl';
import { Above } from '@jetshop/ui/Breakpoints';
import LargeSelector from '@jetshop/ui/ChannelSelector/LargeSelector';
import { FlyoutTarget, FlyoutTrigger } from '@jetshop/ui/Modal/Flyout';
import { ReactComponent as Carrot } from '@jetshop/ui/svg/Carrot.svg';
import React, { useContext, useState } from 'react';
import { styled } from 'linaria/react';
import Button from '../../../ui/Button';
import CloseButton from '../../../ui/CloseButton';
import MaxWidth from '../../MaxWidth';
import Selector from './RecommendedChannelSelector';
import { useChannelBanner } from '@jetshop/core/hooks/useChannelBanner';

import { theme } from '../../../Theme';

const ChannelBannerWrapper = styled('div')`
  display: none;
  &.openBanner {
    display: block;
  }
  align-items: center;
  justify-content: space-between;
  min-height: 70px;
  padding: 16px 0px;
  background-color: ${theme.colors.tablegrey};

  .close-button {
    background: transparent;
  }

  ${theme.above.md} {
    .close-button {
      margin: 0;
      padding-right: 0;
    }
  }

  ${theme.below.md} {
    position: relative;
    padding: 22px 0px;

    .close-button {
      position: absolute;
      top: 0;
      right: 1em;
    }
  }
`;

const BannerContainer = styled(MaxWidth)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BannerContent = styled('div')`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: flex-start;

  .banner-text {
    margin-right: 24px;
    line-height: 1.5;
  }

  .light-text {
    color: #a5a5a5;
    margin: 0 20px;
    white-space: nowrap;
  }

  .selector-wrapper {
    position: relative;
  }

  svg.carrot-icon {
    fill: #4f4f4f;
    width: 9px;
    margin-right: 0;
  }

  .carrot-icon[data-isopen='true'] {
    transform: rotate(180deg);
  }

  .selector-flyout-wrapper {
    position: absolute;
  }

  ${theme.below.md} {
    flex-direction: column;

    .banner-text {
      width: 100%;
      padding-right: 20%;
      margin-right: 0;
      margin-bottom: 16px;
      text-align: left;
    }

    .light-text {
      width: 100%;
      margin: 13px auto;
      text-align: center;
      overflow: hidden;

      &::before,
      &::after {
        background-color: #cccccc;
        content: '';
        display: inline-block;
        height: 1px;
        position: relative;
        vertical-align: middle;
        width: 50%;
      }

      &:before {
        right: 1em;
        margin-left: -50%;
      }

      &:after {
        left: 1em;
        margin-right: -50%;
      }
    }

    .dropdown-selector {
      height: calc(100vh - 229px);
      overflow-y: scroll;
    }

    .selector-wrapper {
      width: 100%;
    }
  }
`;

const ChannelButton = styled(Button)`
  height: 46px;
  width: 200px;
  text-transform: none;
  border-radius: 4px;
  font-size: ${theme.fontSizes[1]};

  ${theme.below.md} {
    width: 100%;
  }
`;

const SelectorButton = styled(Button)`
  height: 46px;
  width: 200px;
  padding: 0 16px;
  text-transform: capitalize;
  background-color: #ffffff;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  color: #4f4f4f;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: ${theme.fontSizes[1]};
  }

  &:hover {
    background-color: #ffffff;
    color: #4f4f4f;
  }

  ${theme.below.md} {
    width: 100%;
  }
`;

const Flyout = ({ children }) => (
  <div
    style={{
      position: 'absolute',
      backgroundColor: 'white',
      zIndex: '999',
      width: '200px'
    }}
  >
    {children}
  </div>
);

const ChannelBanner = () => {
  const {
    channels,
    recommendedChannel,
    selectedChannel,
    updateChannel,
    selectedChannelGroup
  } = useContext(ChannelContext);

  const { bannerIsOpen, hideTheBanner } = useChannelBanner();

  const [dropdownSelector, setDropdownSelector] = useState(false);
  const toggleDropdownSelector = () => {
    dropdownSelector ? setDropdownSelector(false) : setDropdownSelector(true);
  };

  // Return early if openBanner is false or we have no recommended channel
  if (!bannerIsOpen || !recommendedChannel) return null;

  return (
    <ChannelBannerWrapper className={bannerIsOpen && 'openBanner'}>
      <BannerContainer>
        <BannerContent>
          <div className="banner-text">
            {t(
              'It looks like you are visiting us from {country}. Do you want to visit our {country} site?',
              {
                country: recommendedChannel.country.name
              }
            )}
          </div>
          <ChannelButton
            onClick={() => {
              updateChannel(recommendedChannel);
              hideTheBanner();
            }}
          >
            {t('Go to {country}', {
              country: recommendedChannel.country.name
            })}
          </ChannelButton>
          <div className="light-text">{t('or')}</div>
          <Above breakpoint="md">
            {matches =>
              matches ? (
                <div className="selector-wrapper">
                  <FlyoutTrigger id="recommended-channel-selector">
                    {({ showTarget, hideTarget, isOpen }) => (
                      <SelectorButton
                        onClick={isOpen ? hideTarget : showTarget}
                      >
                        <span>{t('Choose country')}</span>
                        <Carrot className="carrot-icon" data-isopen={isOpen} />
                      </SelectorButton>
                    )}
                  </FlyoutTrigger>
                  <FlyoutTarget id="recommended-channel-selector">
                    {({ isOpen, hideTarget }) => (
                      <Flyout>
                        <Selector
                          channels={selectedChannelGroup || channels}
                          selectedChannel={selectedChannel}
                          updateChannel={updateChannel}
                          hideTarget={hideTarget}
                          type={LargeSelector}
                        />
                      </Flyout>
                    )}
                  </FlyoutTarget>
                </div>
              ) : (
                <div className="selector-wrapper">
                  <SelectorButton onClick={toggleDropdownSelector}>
                    <span>{t('Choose country')}</span>
                    <Carrot
                      className="carrot-icon"
                      data-isopen={dropdownSelector}
                    />
                  </SelectorButton>
                  {dropdownSelector && (
                    <div className="dropdown-selector">
                      <Selector
                        channels={channels}
                        hideTarget={() => setDropdownSelector(false)}
                        selectedChannel={selectedChannel}
                        updateChannel={updateChannel}
                        type={LargeSelector}
                      />
                    </div>
                  )}
                </div>
              )
            }
          </Above>
        </BannerContent>

        <CloseButton className="close-button" onClick={hideTheBanner} />
      </BannerContainer>
    </ChannelBannerWrapper>
  );
};

export default ChannelBanner;
