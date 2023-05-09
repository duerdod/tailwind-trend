import React from 'react';
import { styled } from 'linaria/react';
import { Intl } from '@jetshop/intl';
import { ReactComponent as SearchSvg } from '../../svg/Search.svg';

const SearchContainer = styled('div')`
  position: relative;
  width: 100%;
  padding: 24px;

  label {
    padding-left: 25px;
    margin-bottom: 0.25rem;
    display: block;
    font-size: 0.875rem;
    color: #707070;
  }

  input {
    width: 100%;
    height: 46px;
    padding: 0 48px 0 24px;

    font-size: 16px;
    border-radius: 27px;
    border: 1px solid #e0e0e0;
    outline: none;

    font-family: 'Source Sans Pro', sans-serif;
  }

  svg {
    position: absolute;
    top: 56px;
    right: 48px;
    width: 1em;
    height: 1.2em;
  }
`;

const StoreSearch = ({ search, setSearch }) => (
  <SearchContainer>
    <Intl>
      {t => (
        <>
          <label htmlFor="search-field">{t('Search')}</label>
          <input
            id="search-field"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
            }}
            placeholder={t('Type your search here')}
          />
        </>
      )}
    </Intl>
    <SearchSvg />
  </SearchContainer>
);

export default StoreSearch;
