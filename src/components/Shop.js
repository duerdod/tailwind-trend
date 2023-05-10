import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Switch } from 'react-router-dom';

import GenericError from '@jetshop/core/components/DynamicRoute/GenericError';
import DynamicRoute from '@jetshop/core/components/DynamicRoute';
import PaginationProvider from '@jetshop/core/components/Pagination/PaginationProvider';
import { ProductListProvider } from '@jetshop/core/hooks/ProductList/ProductListContext';
import { productListQueries } from './ProductList/productListQueries';
import { useShopConfig } from '@jetshop/core/hooks/useShopConfig';

import categoryPreviewQuery from './CategoryPreviewQuery.gql';
import pagePreviewQuery from './PagePreviewQuery.gql';
import productPreviewQuery from './ProductPreviewQuery.gql';
import routeQuery from './RouteQuery.gql';

import PreviewRoute from './PreviewRoute.loadable';

import { ModalProvider } from '../ui/Modal';

import { Header } from './Layout/Header/Header';
import { Footer } from './Layout/Footer/Footer';
import StartPage from './StartPage/StartPage.loadable.tsx';
import CategoryPage from './CategoryPage/CategoryPage.loadable';

import './index.css';

function Shop() {
  const { routes } = useShopConfig();
  return (
    <GenericError>
      <Helmet
        titleTemplate="%s - Template Trend"
        defaultTitle="Template Trend"
      />
      <ProductListProvider queries={productListQueries}>
        <PaginationProvider defaultProductsPerPage={24}>
          <ModalProvider>
            <Header />
            <main className="">
              <Switch>
                <Route exact path="/" component={StartPage} />
                <Route path="/favourites" component={() => null} />
                <Route path={routes.search.path} component={() => null} />
                <Route path={routes.signup.path} component={() => null} />
                <Route path={routes.login.path} component={() => null} />
                <Route path={routes.logout.path} component={() => null} />
                <Route path={routes.stores.path} component={() => null} />
                <Route
                  path={`${routes.store.path}/:id`}
                  component={() => null}
                />
                <Route path={routes.tree.path} component={() => null} />
                <Route path={routes.myPages.path} component={() => null} />
                <Route
                  exact
                  path={routes.forgotPassword.path}
                  component={() => null}
                />
                <Route
                  path={`${routes.resetPassword.path}/:token`}
                  component={() => null}
                />
                <Route
                  path="/preview"
                  render={props => (
                    <PreviewRoute
                      productQuery={productPreviewQuery}
                      categoryQuery={categoryPreviewQuery}
                      pageQuery={pagePreviewQuery}
                      productPage={() => null}
                      categoryPage={CategoryPage}
                      contentPage={() => null}
                      StartPage={() => null}
                      {...props}
                    />
                  )}
                />
                <DynamicRoute
                  routeQuery={routeQuery}
                  productPage={() => null}
                  categoryPage={CategoryPage}
                  contentPage={() => null}
                  notFoundPage={() => null}
                  LoadingPage={() => null}
                />
              </Switch>
            </main>
            <Footer />
          </ModalProvider>
        </PaginationProvider>
      </ProductListProvider>
    </GenericError>
  );
}

export default Shop;
