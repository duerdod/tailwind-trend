import React from 'react';
import { styled } from 'linaria/react';
import Spinner from './ui/Spinner';
import { theme } from './Theme';

const LoadingPageWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: 100%;
  padding: ${theme.space[3]};
`;
const LoadingPage = () => {
  return (
    <LoadingPageWrapper>
      <Spinner />
    </LoadingPageWrapper>
  );
};

export default LoadingPage;
