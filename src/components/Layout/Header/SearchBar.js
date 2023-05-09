import React from 'react';
import { css } from 'linaria';
import { styled } from 'linaria/react';
import { SearchField } from '@jetshop/ui/Search';
import AutocompleteQuery from './AutocompleteQuery.gql';
import { theme } from '../../Theme';

const PosedSearchBarContainer = styled('div')`
  position: relative;
  width: 100%;
  svg {
    position: absolute;
    right: 8px;
    top: 0;
    bottom: 0;
    margin: auto;
    use {
      fill: #878787;
    }
  }
`;

const InnerSearchBar = styled('div')`
  position: relative;
  margin: 0 auto;
  width: 100%;
`;

const searchFieldStyles = css`
  &[data-flight-searchfield] > * {
    display: flex;
    height: 2rem;
    width: 100% !important;
    justify-content: center;
    input {
      font-size: 16px;
      border: 0;
      background: #f3f3f3;
      height: 100%;
      width: 100%;
      padding: 0 1rem;
    }
  }
  [data-flight-searchfield-cancel] {
    height: 100%;
    min-width: 48px;
    width: fit-content;
  }
  [data-flight-searchfield-flyout] {
    text-align: left;
    top: calc(100% + ((54px - 100%) / 2));
    ${theme.below.md} {
      top: calc(100% + ((64px - 100%) / 2));
      width: calc(100% + 4rem + 16px);
      left: -8px;
      border-left: none;
      border-right: none;
    }
    > * {
      padding: 0.5rem;
    }
    h2 {
      color: #999999;
      text-transform: uppercase;
      font-size: 0.75rem;
      padding: 0.5rem;
    }
    li {
      border-top: 1px solid #e8e8e8;
    }
    a {
      color: black;
      padding: 0.5rem;
      display: block;
    }
  }
`;

const SearchBar = ({ searchOpen, setSearchOpen }) =>
  searchOpen && (
    <PosedSearchBarContainer key={'searchBarPosed'}>
      <InnerSearchBar>
        <SearchField
          autocompleteQuery={AutocompleteQuery}
          onCancel={() => setSearchOpen(false)}
          className={searchFieldStyles}
        />
      </InnerSearchBar>
    </PosedSearchBarContainer>
  );

export { SearchBar };
