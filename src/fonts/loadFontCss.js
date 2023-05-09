import { css } from 'linaria';

import SSPWoff from './source-sans-pro-v11-latin-regular.woff';
import SSPWoff2 from './source-sans-pro-v11-latin-regular.woff2';

import SSPWoffBold from './source-sans-pro-v11-latin-700.woff';
import SSPWoff2Bold from './source-sans-pro-v11-latin-700.woff2';

import SSPWoffSemiBold from './source-sans-pro-v13-latin-600.woff';
import SSPWoff2SemiBold from './source-sans-pro-v13-latin-600.woff2';

// Google Fonts downloaded from http://google-webfonts-helper.herokuapp.com/fonts/sarabun?subsets=latin

export default function loadCss() {
  return css`
    :global(html) {
      /* Regular font */
      @font-face {
        font-family: 'Source Sans Pro';
        src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'),
          url(${SSPWoff2}) format('woff2'), url(${SSPWoff}) format('woff');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }

      /* Bold font */
      @font-face {
        font-family: 'Source Sans Pro';
        src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'),
          url(${SSPWoff2Bold}) format('woff2'),
          url(${SSPWoffBold}) format('woff');
        font-weight: 700;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'Source Sans Pro';
        src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'),
          url(${SSPWoff2SemiBold}) format('woff2'),
          url(${SSPWoffSemiBold}) format('woff');
        font-weight: 600;
        font-style: normal;
        font-display: swap;
      }
      &.source-sans-pro-ready body {
        font-family: 'Source Sans Pro', sans-serif;
        line-height: 1;
        letter-spacing: 0;
        word-spacing: 0;
        font-weight: normal;
      }
    }
  `;
}
