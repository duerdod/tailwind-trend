import React, { useContext } from 'react';
import ProductConfigurationContext from '@jetshop/core/components/ProductConfigurationProvider/ProductConfigurationContext';
import {
  DropdownMenu,
  DropdownMenuButton,
  DropdownMenuItem,
  DropdownMenuItems
} from '@jetshop/ui/DropdownMenu';
import { ReactComponent as Check } from '../../svg/Check.svg';
import { css } from 'linaria';

export function ConfigurationSelector({ product }) {
  const context = useContext(ProductConfigurationContext);

  if (!context) return null;

  const { configurations, selectOption, getSelectedValue } = context;

  return (
    <>
      {configurations.map(config => {
        const selectedValue = getSelectedValue(config);

        return (
          <div key={config.name} className={dropdownStyles}>
            <label htmlFor={`option-${config.name}`}>{config.name}</label>
            <DropdownMenu>
              <DropdownMenuButton id={`option-${config.name}`}>
                {selectedValue}
              </DropdownMenuButton>

              <DropdownMenuItems>
                {config.options.map(option => {
                  return (
                    <DropdownMenuItem
                      closeOnSelect
                      key={option.id}
                      onSelect={() => {
                        selectOption(option, config);
                      }}
                    >
                      {option.name}
                      {selectedValue === option.name && <Check />}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuItems>
            </DropdownMenu>
          </div>
        );
      })}
    </>
  );
}

const dropdownStyles = css`
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
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  [data-flight-dropdown-item] {
    display: flex;
    align-items: center;
    :last-child {
      border-radius: 0 0 3px 3px;
    }
  }
  svg {
    margin-left: auto;
  }
`;
