import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Switch } from 'react-router-dom';

import CustomFont from '@jetshop/core/components/Fonts/CustomFont';
import DynamicRoute from '@jetshop/core/components/DynamicRoute';
import PaginationProvider from '@jetshop/core/components/Pagination/PaginationProvider';
import { ProductListProvider } from '@jetshop/core/hooks/ProductList/ProductListContext';
import { useShopConfig } from '@jetshop/core/hooks/useShopConfig';

import GenericError from '@jetshop/ui/ErrorBoundary/Generic';
import LoadingBar from '@jetshop/ui/Loading/LoadingBar';
import ModalProvider from '@jetshop/ui/Modal/ModalProvider';
import ModalRoot from '@jetshop/ui/Modal/ModalRoot';
import ScrollRestorationHandler from '@jetshop/ui/ScrollRestorationHandler';

import Container from './Layout/Container';
import Content from './Layout/Content';
import Footer from './Layout/Footer/Footer';
import Header from './Layout/Header/Header';

import ForgotPassword from './Auth/ForgotPassword.loadable';
import LogInPage from './Auth/LogInPage.loadable';
import ResetPassword from './Auth/ResetPassword.loadable';
import SignUpPage from './Auth/Signup/SignUpPage.loadable';
import CategoryPage from './CategoryPage/CategoryPage.loadable';
import ContentPage from './ContentPage/ContentPage.loadable';
import CookieConsent from './CookieConsent';
import LoadingPage from './LoadingPage';
import LogOutPage from './LogOut.loadable';
import MyPages from './MyPages/MyPages.loadable';
import NavTreePage from './NavigationTree/NavTreePage.loadable';
import NotFoundPage from './NotFoundPage.loadable';
import PreviewRoute from './PreviewRoute.loadable';
import { Favourites } from './ProductList/Favourites';
import { productListQueries } from './ProductList/productListQueries';
import ProductPage from './ProductPage/ProductPage.loadable';
import SearchPage from './SearchPage/SearchPage.loadable';
import StartPage from './StartPage/StartPage.loadable';
import Store from './Store/Store.loadable';
import StoreLocator from './StoreLocator/StoreLocator.loadable';

import categoryPreviewQuery from './CategoryPreviewQuery.gql';
import pagePreviewQuery from './PagePreviewQuery.gql';
import productPreviewQuery from './ProductPreviewQuery.gql';
import routeQuery from './RouteQuery.gql';

import { theme } from './Theme';
import loadFontCss from '../fonts/loadFontCss';
import '../globalStyles';

function Shop() {
  const { routes } = useShopConfig();
  return (
    <GenericError>
      <ModalProvider>
        <Container>
          <LoadingBar color={theme.colors.loadingBar} />
          <CustomFont
            primaryFont={theme.fonts.primary}
            injectCss={loadFontCss}
          />
          <Helmet
            titleTemplate="%s - Template Trend"
            defaultTitle="Template Trend"
          />
          <ProductListProvider queries={productListQueries}>
            <PaginationProvider defaultProductsPerPage={24}>
              <Header />
              <Content>
                <Switch>
                  <Route exact path="/" component={StartPage} />
                  <Route path="/favourites" component={Favourites} />
                  <Route path={routes.search.path} component={SearchPage} />
                  <Route path={routes.signup.path} component={SignUpPage} />
                  <Route path={routes.login.path} component={LogInPage} />
                  <Route path={routes.logout.path} component={LogOutPage} />
                  <Route path={routes.stores.path} component={StoreLocator} />
                  <Route path={`${routes.store.path}/:id`} component={Store} />
                  <Route path={routes.tree.path} component={NavTreePage} />
                  <Route path={routes.myPages.path} component={MyPages} />
                  <Route
                    exact
                    path={routes.forgotPassword.path}
                    component={ForgotPassword}
                  />
                  <Route
                    path={`${routes.resetPassword.path}/:token`}
                    component={ResetPassword}
                  />
                  <Route
                    path="/preview"
                    render={props => (
                      <PreviewRoute
                        productQuery={productPreviewQuery}
                        categoryQuery={categoryPreviewQuery}
                        pageQuery={pagePreviewQuery}
                        productPage={ProductPage}
                        categoryPage={CategoryPage}
                        contentPage={ContentPage}
                        StartPage={StartPage}
                        {...props}
                      />
                    )}
                  />
                  <DynamicRoute
                    routeQuery={routeQuery}
                    productPage={ProductPage}
                    categoryPage={CategoryPage}
                    contentPage={ContentPage}
                    notFoundPage={NotFoundPage}
                    LoadingPage={LoadingPage}
                  />
                </Switch>
              </Content>
              <Footer />
            </PaginationProvider>
          </ProductListProvider>
          <ModalRoot />
          <ScrollRestorationHandler
            ignoreForRouteTypes={[
              'sortOrderChange',
              'filterChange',
              'paginationChange'
            ]}
          />
          <CookieConsent />
        </Container>
      </ModalProvider>
    </GenericError>
  );
}

export default Shop;
