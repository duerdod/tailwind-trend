import React from 'react';
import { Link } from 'react-router-dom';
import { Below } from '@jetshop/ui/Breakpoints';
import { styled } from 'linaria/react';
import { ReactComponent as NorceLogo } from './NorceLogo.svg';
import { theme } from '../../Theme';

const StoreName = styled('h2')`
  font-size: 30px;
  font-weight: bold;
  line-height: normal;
  text-align: center;
  text-decoration: none;
  color: inherit;
  a {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-decoration: none;
    color: inherit;
    svg {
      width: 100px;
      ${theme.below.md} {
        width: 85px;
      }
    }
    span {
      font-size: 12px;
      text-transform: uppercase;
    }
  }
`;

const Logo = ({ searchOpen }) => (
  <Below breakpoint="md">
    {matches =>
      matches ? (
        <>
          {!searchOpen && (
            <StoreName>
              <Link to="/">
                <NorceLogo />
                <span>Storefront</span>
              </Link>
            </StoreName>
          )}
        </>
      ) : (
        <StoreName>
          <Link to="/">
            <NorceLogo />
            <span>Storefront</span>
          </Link>
        </StoreName>
      )
    }
  </Below>
);

export { Logo };
