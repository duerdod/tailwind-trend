/* eslint-disable */
import { css } from 'linaria';
import '@jetshop/ui/Theme/sanitizeCss';

css`
  :global() {
    ${resets};
  }
`;

const fallbackStyles = `
  font-family: '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto',
    'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', 'Arial', 'sans-serif';
  font-size: 16px;
  line-height: 1.6;
  letter-spacing: -0.7px;
  word-spacing: -0.1px;
  font-weight: 400;
  visibility: visible;
`;

const resets = `
    html,
    body {
      height: 100%;
      font-family: '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto',
        'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
        'Helvetica Neue', 'Arial', 'sans-serif';
    }
    html,
    body,
    #root {
      min-height: 100%;
    }
    #root {
      display: flex;
      flex-direction: column;
    }
    button {
      cursor: pointer;
      padding: 0px;
      border: none;
      font: inherit;
    }
    ol,
    ul,
    h4,
    h3,
    h2,
    h1 {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    p,
    dd {
      margin: 0;
      padding: 0;
    }
    input {
      -webkit-appearance: none;
    }
    .ReactModal__Body--open {
      overflow: hidden;
    }
    .ReactModal__Overlay--after-open {
      overflow: scroll;
    }
    body {
      ${fallbackStyles};
      -webkit-font-smoothing: antialiased;
    }
    /* 
   * apply a natural box layout model to all elements, but allowing components
   * to change */
    html {
      box-sizing: border-box;
    }
    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }
`;
