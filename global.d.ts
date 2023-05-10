declare module '*.gql' {
  import { DocumentNode } from 'graphql';
  const value: DocumentNode;
  export default value;
  export const addToCart: DocumentNode;
  export const removeFromCart: DocumentNode;
  export const decrementItemQuantity: DocumentNode;
  export const incrementItemQuantity: DocumentNode;
  export const setItemQuantity: DocumentNode;
  export const setCartId: DocumentNode;
  export const login: DocumentNode;
  export const resetPassword: DocumentNode;
}

declare module '*.svg' {
  import React = require('react');

  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}

declare let __IN_SERVER__: boolean;

declare module 'history' {
  export type Location = {
    state?: {
      type: any;
      list: any;
    };
  };
}
declare module 'react-router' {
  export namespace History {
    export type LocationState = {
      list: any;
      type: any;
    };
  }
}
