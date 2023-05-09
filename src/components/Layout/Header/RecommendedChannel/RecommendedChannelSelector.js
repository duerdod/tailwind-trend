import React, { useState } from 'react';
import { styled } from 'linaria/react';
import { cx } from 'linaria';
import t from '@jetshop/intl';
import ChannelSelector, {
  LangCurrWrapper,
  SelectorBody
} from '@jetshop/ui/ChannelSelector/ChannelSelector';
import {
  CancelButton,
  CommitButton
} from '@jetshop/ui/ChannelSelector/ChannelSelectorButtons';
import LargeSelector from '@jetshop/ui/ChannelSelector/LargeSelector';
import CheckboxGroup from '@jetshop/ui/Checkbox/CheckboxGroup';
import flattenCountries from '../ChannelSelector/flattenCountries';
import { theme } from '../../../Theme';

const Wrapper = styled('div')`
  & > div:first-child {
    border: 1px solid #e1e1e1;
    background: #ffffff;
  }
`;

const Country = styled('div')`
  height: 42px;
  font-size: 14px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 200ms;
  color: #4f4f4f;
  font-weight: 400;
  opacity: 0.75;
  background-color: transparent;

  &.isActive {
    background-color: #ebebeb;
    color: #000;
    font-weight: 600;
    opacity: 1;
  }
  :hover {
    opacity: 1;
  }
`;

const CountryFlag = styled('img')`
  height: 12px;
  width: 16px;
  margin-right: 15px;
`;

const StylesWrapper = styled('div')`
  label {
    display: inline-flex;
  }

  ${LangCurrWrapper} {
    background: #f9f9f9;
    margin-bottom: 0;
  }
`;

const ChecboxGroupContainer = styled('div')`
  & > div {
    position: relative;
    padding-left: 80px;
    & > span {
      position: absolute;
      top: 0;
      left: 0;
      color: #000;
      & ~ label {
        margin-top: 0.6rem;
        color: #000;
      }
      & + label {
        margin-top: 0;
      }
    }
  }
  input ~ span {
    border: 1px solid ${theme.colors.blue};
    svg {
      height: 8px;
    }
  }
  label input:checked ~ span {
    background-color: ${theme.colors.blue};
  }
`;

const StyledChannelSelector = styled(ChannelSelector)`
  border: 1px solid #e1e1e1;
`;

const StyledSelectorBody = styled(SelectorBody)`
  padding: 0;
`;

const buttonCss = `
  margin: 0;
  width: 100%;
`;

const StyledCommitButton = styled(CommitButton)`
  ${buttonCss}
`;

const StyledCancelButton = styled(CancelButton)`
  ${buttonCss};
  border: 1px solid #e1e1e1;
`;

const Selector = ({ channels, selectedChannel, updateChannel, hideTarget }) => {
  const [countries] = useState(flattenCountries(channels));

  return (
    <StyledChannelSelector
      channels={channels}
      initialChannel={selectedChannel}
      render={({
        currencyItems,
        languageItems,
        selectedChannel,
        onSelect,
        hasChanged,
        onCurrencySelect,
        onLanguageSelect
      }) => (
        <Wrapper>
          <LargeSelector>
            <StyledSelectorBody>
              {countries.map(({ name, code, channel }) => (
                <Country
                  key={channel.id + name}
                  className={cx(
                    channel.id === selectedChannel.id &&
                      name === selectedChannel.country.name &&
                      'isActive'
                  )}
                  onClick={() => onSelect(channel.id, null, null, code)}
                >
                  <CountryFlag
                    src={`https://countryflags.jetshop.io/${code}/flat/32.png`}
                    alt="Country Flag"
                    width="16"
                    height="12"
                  />
                  {name} ({channel.name})
                </Country>
              ))}
            </StyledSelectorBody>
            <StylesWrapper>
              <LangCurrWrapper>
                <ChecboxGroupContainer>
                  <CheckboxGroup
                    selectedItem={selectedChannel.language.name}
                    items={languageItems}
                    handleChange={onLanguageSelect}
                    groupLabel={t('Language')}
                  />
                  <CheckboxGroup
                    selectedItem={selectedChannel.currency.name}
                    items={currencyItems}
                    handleChange={onCurrencySelect}
                    groupLabel={t('Currency')}
                  />
                </ChecboxGroupContainer>
              </LangCurrWrapper>
            </StylesWrapper>

            {hasChanged ? (
              <StyledCommitButton
                onClick={() => {
                  updateChannel(selectedChannel);
                  hideTarget();
                }}
                text={t('Update')}
              />
            ) : (
              <StyledCancelButton
                text={t('Close')}
                onClick={() => hideTarget()}
              />
            )}
          </LargeSelector>
        </Wrapper>
      )}
    />
  );
};

export default Selector;
