import React from 'react';
import { styled } from 'linaria/react';
import MobileCategories from './Categories/MobileCategories';
import t from '@jetshop/intl';
import Drawer, { DrawerTarget } from '@jetshop/ui/Modal/Drawer';
import CloseButton from '../../ui/CloseButton';
import { Link } from 'react-router-dom';
import useAuth from '@jetshop/core/components/AuthContext/useAuth';
import { useShopConfig } from '@jetshop/core/hooks/useShopConfig';
import ChannelSelectorModal from './ChannelSelector/ChannelSelectorModal';

const StyledCloseButton = styled(CloseButton)`
  margin-left: 0;
  margin-right: auto;
`;

const Title = styled('h1')`
  text-align: center;
  position: absolute;
  font-size: 16px;
`;

const NavBarHeader = styled('div')`
  position: relative;
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  height: 45px;
`;

const Scroll = styled('div')`
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  flex: 1 1 auto;
`;

const SecondaryMenu = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  flex: 0 0 auto;
`;

const SecondaryMenuItem = styled.li`
  list-style: none;
  display: block;
  padding: 1em 1em 0.9375em;
  a,
  a:active {
    text-decoration: none;
    color: #666;
  }
  button {
    background: none;
    color: #666;
  }
`;

export default function MobileMenu({ data }) {
  const { loggedIn } = useAuth();
  const { routes } = useShopConfig();
  if (!(data && data.categories)) return null;
  return (
    <DrawerTarget id="menu-drawer">
      {drawer => (
        <Drawer isOpen={drawer.isOpen}>
          <NavBarHeader>
            <StyledCloseButton onClick={drawer.hideTarget} />
            <Title>{t('Menu')}</Title>
          </NavBarHeader>
          <Scroll>
            <MobileCategories
              categories={data.categories}
              closeMenu={drawer.hideTarget}
            />
            <SecondaryMenu>
              <SecondaryMenuItem>
                <Link onClick={drawer.hideTarget} to={routes.myPages.path}>
                  {loggedIn ? t('My Pages') : t('Log in')}
                </Link>
              </SecondaryMenuItem>
              <SecondaryMenuItem>
                <Link to={routes.stores.path} onClick={drawer.hideTarget}>
                  {t('Find Store')}
                </Link>
              </SecondaryMenuItem>
              <SecondaryMenuItem>
                <ChannelSelectorModal hideMobileMenu={drawer.hideTarget} />
              </SecondaryMenuItem>
            </SecondaryMenu>
          </Scroll>
        </Drawer>
      )}
    </DrawerTarget>
  );
}
