import t from '@jetshop/intl';
import ChannelSelector, {
  LangCurrWrapper,
  SelectorBody,
  Title
} from '@jetshop/ui/ChannelSelector/ChannelSelector';
import {
  CancelButton,
  CommitButton
} from '@jetshop/ui/ChannelSelector/ChannelSelectorButtons';
import MiniSelector from '@jetshop/ui/ChannelSelector/MiniSelector';
import CheckboxGroup from '@jetshop/ui/Checkbox/CheckboxGroup';
import React, { useState } from 'react';
import { styled } from 'linaria/react';
import { css } from 'linaria';
import flattenCountries from './flattenCountries';
import { theme } from '../../../Theme';

const Country = styled('div')`
  height: 42px;
  font-size: 14px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 200ms;
  background-color: transparent;
  color: #4f4f4f;
  font-weight: 400;
  opacity: 0.75;
  :hover {
    opacity: 1;
  }

  &.active {
    color: #000;
    font-weight: 600;
    opacity: 1;
    background-color: #ebebeb;
  }
`;

const CountryFlag = styled('img')`
  height: 12px;
  width: 16px;
  margin-right: 15px;
`;

const CheckboxGroupContainer = styled('div')`
  & > div {
    position: relative;
    padding-left: 80px;
    + div {
      margin-top: 1em;
    }
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
  }
  label input:checked ~ span {
    background-color: ${theme.colors.blue};
  }
`;

const StyledTitle = styled(Title)`
  color: #000;
  text-align: center;
  font-weight: 600;
  border-bottom: 1px solid #e8e8e8;
  padding: 2px 0 16px;
  margin-bottom: 4px;
  font-size: 14px;
  ${theme.below.lg} {
    && {
      padding-bottom: 0.5rem;
    }
  }
`;

const actions = css`
  display: flex;
  && button {
    width: 100%;
    margin: 0;
    max-width: 100%;
    &.commit-button {
      background: ${theme.colors.blue};
      color: white;
    }
  }
`;

const Selector = ({
  type = MiniSelector,
  channels,
  selectedChannel,
  hideTarget,
  updateChannel
}) => {
  const [countries] = useState(flattenCountries(channels));
  const Comp = type;

  return (
    <ChannelSelector
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
        <Comp style={type === MiniSelector ? { width: '16rem' } : null}>
          <SelectorBody>
            <StyledTitle>{t('Select your country')}</StyledTitle>
            {countries.map(({ name, code, channel }) => (
              <Country
                key={channel.id + name}
                className={
                  channel.id === selectedChannel.id &&
                  name === selectedChannel.country.name
                    ? 'active'
                    : null
                }
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
          </SelectorBody>
          <LangCurrWrapper>
            <CheckboxGroupContainer>
              <CheckboxGroup
                selectedItem={selectedChannel.language.name}
                items={languageItems}
                handleChange={onLanguageSelect}
                data-testid="language-checkbox-group"
                groupLabel={t('Language')}
              />
              <CheckboxGroup
                selectedItem={selectedChannel.currency.name}
                items={currencyItems}
                handleChange={onCurrencySelect}
                groupLabel={t('Currency')}
              />
            </CheckboxGroupContainer>
          </LangCurrWrapper>
          <div className={actions}>
            <CancelButton text={t('Close')} onClick={() => hideTarget()} />
            {hasChanged && (
              <CommitButton
                className="commit-button"
                onClick={() => {
                  updateChannel(selectedChannel);
                  hideTarget();
                }}
                text={t('Update')}
              />
            )}
          </div>
        </Comp>
      )}
    />
  );
};

export default Selector;
