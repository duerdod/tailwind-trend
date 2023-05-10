import React, { ReactNode } from 'react';

export const MaxWidth: React.FunctionComponent<{
  children: ReactNode;
  className?: string;
}> = props => {
  return (
    <div
      {...props}
      className={`${props.className} max-w-appmax relative my-0 mx-auto flex w-full flex-auto flex-col items-stretch py-0 px-3`}
    />
  );
};
