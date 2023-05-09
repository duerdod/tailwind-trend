import React from 'react';
import { PaginationWrapper } from '@jetshop/ui/Pagination/Pagination';
import { Pagination as UIPagination } from '@jetshop/ui/Pagination';
import { css } from 'linaria';
import { theme } from '../Theme';

export function Pagination(props) {
  return (
    <PaginationWrapper>
      <UIPagination {...props} className={paginationStyles} />
    </PaginationWrapper>
  );
}

const paginationStyles = css`
  a {
    padding: 1em;
    color: ${theme.colors.blue};
    :hover {
      opacity: 0.8;
    }
    :first-of-type {
      padding-left: 0px;
    }
    :last-of-type {
      padding-right: 0px;
    }
  }
  a[data-disabled='true'] {
    cursor: not-allowed;
    color: #707070;
  }
`;
