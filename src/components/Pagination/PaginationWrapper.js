import React from 'react';
import { styled } from 'linaria/react';
import { Pagination } from '@jetshop/ui/Pagination';
import MaxWidth from '../Layout/MaxWidth';

const Wrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  padding: 1rem 0;
`;

const PaginationWrapper = props => (
  <Wrapper>
    <MaxWidth>
      <Pagination {...props} />
    </MaxWidth>
  </Wrapper>
);

export default PaginationWrapper;
