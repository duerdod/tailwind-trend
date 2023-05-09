import React from 'react';
import t from '@jetshop/intl';
import { styled } from 'linaria/react';
import { ReactComponent as Search } from '../../../svg/Search.svg';
import { theme } from '../../Theme';

const Button = styled('button')`
  background: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: inherit;
  :hover {
    color: ${theme.colors.black};
    svg {
      use {
        fill: ${theme.colors.black};
      }
    }
  }
  svg {
    margin: 4px;
    margin-bottom: 0;
    height: 18px;
    width: 18px;
    use {
      fill: #878787;
    }
  }
`;

function SearchButton(props) {
  const { setSearchOpen, searchIsOpen, ...rest } = props;
  return (
    <Button onClick={() => setSearchOpen(true)} {...rest}>
      <Search />
      <span> {t('Search')}</span>
    </Button>
  );
}

export default SearchButton;
