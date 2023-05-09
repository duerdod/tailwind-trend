import useAuth from '@jetshop/core/components/AuthContext/useAuth';
import { useShopConfig } from '@jetshop/core/hooks/useShopConfig';
import t from '@jetshop/intl';
import { Above } from '@jetshop/ui/Breakpoints';
import { DrawerTrigger } from '@jetshop/ui/Modal/Drawer/DrawerTrigger';
import { styled } from 'linaria/react';
import React from 'react';
import { useQuery } from 'react-apollo';
import { Link } from 'react-router-dom';
import { ReactComponent as Menu } from '../../../svg/Menu.svg';
import { ReactComponent as Person } from '../../../svg/Person.svg';
import CartButton from '../../Cart/CartButton';
import CartFlyout from '../../Cart/CartFlyout';
import { FavouriteCount } from '../../ProductList/FavouriteCount';
import { theme } from '../../Theme';
import MaxWidth from '../MaxWidth';
import { CategoryMenu } from './CategoryMenu/CategoryMenu';
import ChannelSelector from './ChannelSelector/ChannelSelector';
import homeCategoriesQuery from './HomeCategoriesQuery.gql';
import { LogoSearchBar } from './LogoSearchBar';
import MobileMenu from './MobileMenu';
import ChannelBanner from './RecommendedChannel/ChannelBanner';
import SearchButton from './SearchButton';
import TopNav from './TopNav';
import { Notifications } from '../Notifications';

const MyPagesLink = styled(Link)`
  display: flex;
  align-items: center;
  svg {
    margin: 4px;
    margin-bottom: 0;
    height: 18px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  :hover {
    text-decoration: none;
  }
`;

const Container = styled('header')`
  background-color: #fff;
  position: relative;
  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      color: #000;
    }
  }
  ${theme.below.md} {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 64px;
  }

  .header-button {
    text-decoration: none;
    color: #666;

    &:hover {
      text-decoration: underline;
      color: #000;
    }
  }
  .header-button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    flex-direction: column;
    cursor: pointer;
    &:hover {
      svg {
        use {
          fill: black;
        }
      }
    }
    svg {
      width: 18px;
      height: 20px;
      margin: 0px;
      use {
        fill: #878787;
      }
    }
    span {
      font-size: 0.75rem;
    }
    .badge-svg-wrapper {
      height: 20px;
      position: relative;
      .badge {
        position: absolute;
        top: -5px;
        right: -5px;
        color: white;
        font-size: 0.5rem;
      }
    }
  }
`;

const HeaderContainer = styled('div')`
  height: 54px;
  position: relative;
  z-index: 99;
  width: 100%;
  display: flex;
  align-items: center;
`;

const HeaderItemsContainer = styled('div')`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const MenuButton = styled('button')`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  background: transparent;
  align-items: center;
  svg {
    height: 18px;
    width: 18px;
  }
  :focus,
  :active,
  :hover {
    outline: none;
    opacity: 0.8;
  }
  label {
    margin-top: 3px;
  }
`;

export const IconContainer = styled('span')`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  margin: 0;
`;

function TopHeader() {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const { loggedIn } = useAuth();
  const { routes } = useShopConfig();
  return (
    <HeaderContainer>
      <MaxWidth>
        <HeaderItemsContainer>
          <Above breakpoint="md">
            {matches =>
              matches ? (
                <TopNav left>
                  <ChannelSelector />
                  <StyledLink to={routes.stores.path} className="header-button">
                    {t('Find Store')}
                  </StyledLink>
                </TopNav>
              ) : (
                <TopNav searchOpen={searchOpen} left>
                  <DrawerTrigger preventOverflow={true} id="menu-drawer">
                    {drawer => (
                      <MenuButton
                        onClick={
                          drawer.isOpen ? drawer.hideTarget : drawer.showTarget
                        }
                      >
                        <div className="header-button">
                          <Menu />
                        </div>
                        <label>{t('Menu')}</label>
                      </MenuButton>
                    )}
                  </DrawerTrigger>
                </TopNav>
              )
            }
          </Above>

          <LogoSearchBar
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
          />
          <Above breakpoint="md">
            {matches => (
              <TopNav searchOpen={searchOpen} right>
                {!searchOpen && (
                  <SearchButton
                    className="header-button"
                    setSearchOpen={setSearchOpen}
                    key="searchButtonPosed"
                  />
                )}
                {matches && (
                  <MyPagesLink
                    className="header-button"
                    to={routes.myPages.path}
                  >
                    <Person />
                    <span>{loggedIn ? t('My Pages') : t('Log in')}</span>
                  </MyPagesLink>
                )}
                <FavouriteCount className="header-button" />
                <CartButton className="header-button" />
              </TopNav>
            )}
          </Above>
          <CartFlyout />
        </HeaderItemsContainer>
      </MaxWidth>
    </HeaderContainer>
  );
}

export default function Header() {
  const result = useQuery(homeCategoriesQuery, {
    variables: {
      levels: 1
    }
  });

  return (
    <>
      <ChannelBanner />
      <Container>
        <TopHeader categories={result} />
        <Above breakpoint="md">
          {matches =>
            matches ? (
              <>
                <CategoryMenu data={result.data} />
              </>
            ) : (
              <MobileMenu data={result.data} />
            )
          }
        </Above>
        <Notifications />
      </Container>
    </>
  );
}
