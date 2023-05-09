import React from 'react';
import { SearchBar } from './SearchBar';
import { Logo } from './Logo';
import { styled } from 'linaria/react';

const LogoSearchBarWrapper = styled('div')`
  width: 100%;
  max-width: 30rem;
  display: flex;
  justify-content: center;
`;
function LogoSearchBar({ searchOpen, setSearchOpen }) {
  return (
    <LogoSearchBarWrapper>
      {searchOpen ? (
        <SearchBar searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
      ) : (
        <Logo searchOpen={searchOpen} />
      )}
    </LogoSearchBarWrapper>
  );
}

export { LogoSearchBar };
