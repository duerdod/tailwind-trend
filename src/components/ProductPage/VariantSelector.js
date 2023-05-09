import { useIntl } from '@jetshop/intl';
import {
  DropdownMenu,
  DropdownMenuButton,
  DropdownMenuItem,
  DropdownMenuItems
} from '@jetshop/ui/DropdownMenu';
import React from 'react';
import { css, cx } from 'linaria';
import { ReactComponent as Caret } from '../../svg/Caret.svg';
import { ReactComponent as Check } from '../../svg/Check.svg';
import ButtonWithLoading from '../ui/Button';
import StockOrb from './StockStatus/StockOrb';

export function VariantSelector({
  product,
  variantHandler,
  showValidation,
  disableOutOfStock
}) {
  return (
    <div className={sharedStyles}>
      {product.variants.options.map((option, index) => {
        let showValidationMessage = false;
        if (
          showValidation &&
          variantHandler.getMissingOptions()?.includes(option)
        ) {
          showValidationMessage = true;
        }

        if (option.values.length < 4) {
          return (
            <ButtonSelect
              option={option}
              variantHandler={variantHandler}
              key={option.name}
              showValidationMessage={showValidationMessage}
              disableOutOfStock={disableOutOfStock}
              doNotDisable={index === 0}
            />
          );
        }
        return (
          <DropdownVariantSelect
            key={option.name}
            option={option}
            variantHandler={variantHandler}
            showValidationMessage={showValidationMessage}
            doNotDisable={index === 0}
          />
        );
      })}
    </div>
  );
}

const sharedStyles = css`
  label {
    display: flex;
    padding-bottom: 0.25em;
    margin-top: 1em;
    font-size: 0.875em;
    align-items: center;
  }
  .invalid {
    label {
      color: #eb5757;
    }
  }
  .missingVariant {
    margin-right: 0.25em;
    height: 10px;
    width: 10px;
  }
`;

function ButtonSelect({
  option,
  variantHandler,
  showValidationMessage,
  disableOutOfStock,
  doNotDisable
}) {
  const { getSelectedValue, validateSelection, selectValue } = variantHandler;
  const selectedValue = getSelectedValue(option);
  const t = useIntl();

  return (
    <div className={cx(buttonSelectStyles, showValidationMessage && 'invalid')}>
      <label>
        {showValidationMessage && <StockOrb className="missingVariant" />}
        {t('Select {optionName}', { optionName: option.name })}
      </label>
      {option.values.map(value => {
        const validation = validateSelection(value, option);
        return (
          <ButtonWithLoading
            data-testid={option.name + value}
            key={option.name + value}
            onClick={() => selectValue(value, option)}
            disabled={
              !doNotDisable &&
              (validation === 'invalid' ||
                (disableOutOfStock && validation === 'outOfStock'))
            }
            secondary={value !== selectedValue}
            aria-pressed={value === selectedValue}
          >
            {value}
          </ButtonWithLoading>
        );
      })}
    </div>
  );
}

const buttonSelectStyles = css`
  margin: 1em 0;
  button {
    width: auto;
    border: 1px solid #dedede !important;
    + button {
      margin-left: 0.5em;
    }
  }
  &.invalid button {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;

function DropdownVariantSelect({
  option,
  variantHandler,
  showValidationMessage,
  doNotDisable
}) {
  const { getSelectedValue, validateSelection, selectValue } = variantHandler;
  const t = useIntl();

  const selectedValue = getSelectedValue(option);
  return (
    <div className={cx(dropdownStyles, showValidationMessage && 'invalid')}>
      <label htmlFor={`option-${option.name}`}>
        {showValidationMessage && <StockOrb className="missingVariant" />}
        {option.name}
      </label>
      <DropdownMenu>
        <DropdownMenuButton id={`option-${option.name}`}>
          {selectedValue
            ? selectedValue
            : t.rich('Select {option}', { option: option.name })}
          <Caret />
        </DropdownMenuButton>
        <DropdownMenuItems style={{ zIndex: 9999 }}>
          {option.values.map(value => {
            const validation = validateSelection(value, option);
            return (
              <DropdownMenuItem
                data-testid={value + option.name}
                key={value + option.name}
                disabled={!doNotDisable && validation === 'invalid'}
                onSelect={({ setIsOpen }) => {
                  selectValue(value, option);
                  setIsOpen(false);
                }}
                style={{ opacity: validation === 'invalid' ? 0.5 : 1 }}
              >
                {value}
                {selectedValue === value && <Check />}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuItems>
      </DropdownMenu>
    </div>
  );
}

export const dropdownStyles = css`
  // && wrapping needed to avoid non-deterministic styling
  && {
    margin: 1em 0;
    [data-flight-dropdown] {
      background: white;
    }
    [data-flight-dropdown-button] {
      background: white;
      width: 100%;
      display: flex;
      align-items: center;
      border: 1px solid #dedede;
    }
    [data-flight-dropdown-open='true'] {
      [data-flight-dropdown-button] {
        border-bottom-color: transparent;
        border-radius: 3px 3px 0 0;
      }
    }
    [data-flight-dropdown-items] {
      width: 100%;
      border: 1px solid #dedede;
      margin-top: -1px;
      border-radius: 0 0 3px 3px;
    }
    [data-flight-dropdown-item] {
      display: flex;
      align-items: center;
      label {
        width: 100%;
      }
      :last-child {
        border-radius: 0 0 3px 3px;
      }
    }
    &.invalid [data-flight-dropdown-button] {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    svg {
      margin-left: auto;
    }
  }
`;
