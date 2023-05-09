import { css } from 'linaria';
import React from 'react';
import { DropdownMenu } from '@jetshop/ui/DropdownMenu';
import { theme } from '../../Theme';

const menu = css`
  margin-bottom: 1em;
  font-size: 0.875rem;

  [data-flight-dropdown-items] {
    top: calc(100% - 1px);
    background: ${theme.colors.background};
    border: 1px solid ${theme.colors.blue};
    border-top: 0;
    border-radius: 0 0 3px 3px;
    z-index: 999;
    width: 100%;
  }
  [data-flight-dropdown-item] {
    overflow: hidden;
    display: block;
    padding: 0.75em;
    border-top: 1px solid ${theme.colors.lightgrey};
    width: 100%;
    text-align: left;
    background: transparent;
    display: flex;
    align-items: center;
    span + * {
      margin-left: auto;
    }
    /* qty text */
    span + span {
      padding-left: 0.5em;
      font-size: 80%;
    }
    :hover,
    :focus {
      background: white;
      color: ${theme.colors.blue};
      outline: none;
    }
  }

  [data-flight-dropdown-button] {
    padding: 0.75em;
    border: 1px solid #dedede;
    width: 100%;
    text-align: left;
    background: ${theme.colors.white};
    font-weight: bold;
    border-radius: 3px;
    outline: none;
    display: flex;
    align-items: center;

    svg {
      margin-left: auto;
    }

    :focus {
      border: 1px solid ${theme.colors.blue};
    }

    &[aria-expanded='true'] {
      border-radius: 3px 3px 0 0;
      border-color: ${theme.colors.blue};

      .carot {
        transform: rotate(180deg);
      }
    }
  }
`;

export function FilterDropdownMenu(props) {
  return <DropdownMenu className={menu} {...props} />;
}
