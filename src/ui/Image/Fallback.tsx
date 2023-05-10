import React from 'react';

/** Display this if JS is disabled. */

export const Fallback = ({
  children
}: {
  children: React.ReactElement<{}>;
}) => <noscript>{children}</noscript>;
