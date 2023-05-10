import * as translations from '../translations';
import channelsQuery from './ChannelsQuery.gql';
import homeCategoriesQuery from './components/Layout/Header/HomeCategoriesQuery.gql';
import routeQuery from './components/RouteQuery.gql';
import createFacebookTracker from '@jetshop/core/server/tracking/facebook';

const config = {
  theme: {
    breakpoints: {
      xs: '20rem',
      sm: '40rem',
      md: '50rem',
      lg: '64rem',
      xl: '80rem'
    }
  },
  apolloConfig: {
    shopid: process.env.REACT_APP_SHOP_ID || 'demostore',
    graphQLURI:
      process.env.REACT_APP_GRAPHQL_URI || 'https://storeapi.jetshop.io/',
    token:
      process.env.REACT_APP_APOLLO_TOKEN ||
      '359fd7c1-8e72-4270-b899-2bda9ae6ef57',
    engineApiKey: process.env.ENGINE_API_KEY || '',
    enableGateway: false,
    channelsQuery,
    persistedQueries: [
      {
        query: homeCategoriesQuery,
        variables: { levels: 1 }
      }
    ]
  },
  additionalGtagTrackingIds: [],
  relewareEnabled: true,
  sentry: {
    clientDSN: process.env.FLIGHT_SENTRY_CLIENT_DSN,
    serverDSN: process.env.FLIGHT_SENTRY_SERVER_DSN,
    ignoreErrors: []
  },
  intl: {
    translations,
    defaultLocale: 'en',
    options: {}
  },
  channelOverrides: {},
  disableGeoRedirect: process.env.REACT_APP_DISABLE_GEOREDIRECT || true,
  singleDomainMode:
    typeof process.env.REACT_APP_SINGLE_DOMAIN_MODE === 'undefined'
      ? true
      : process.env.REACT_APP_SINGLE_DOMAIN_MODE, // default to true if this env var is not set
  schemaExtensions: [],
  preserveRedirect: true,
  structuredData: {
    disableDefaultProductData: false
  },
  openGraph: {
    disableDefaultProductData: false
  },
  trackers: [],
  serverTrackers: [
    createFacebookTracker({
      pixelId: process.env.FACEBOOK_PIXEL_ID,
      token: process.env.FACEBOOK_CAPI_TOKEN
    })
  ],
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
  loginPath: '/login',
  pathsWithNoAuthRequired: ['/login', '/reset-password', '/forgot-password'],
  preload: {
    routeQuery
  },
  usePrimaryRouteForProducts: false,
  useTrackingConsentAPI: true
};
export default config;
