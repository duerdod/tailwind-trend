import t from '@jetshop/intl';
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { css } from 'linaria';
import customerNameQuery from './CustomerNameQuery.gql';
import { theme } from '../Theme';
import { LoadingLine } from '@jetshop/ui/Loading/LoadingLine';

const header = css`
  font-weight: 600;
  font-size: 27px;
  line-height: 34px;
  margin-bottom: 50px;
  ${theme.below.sm} {
    margin-bottom: 24px;
    margin-right: 12px;
    margin-left: 12px;
    width: 100%;
    text-align: center;
  }
`;

export const CustomerName = () => {
  const { data, loading } = useQuery(customerNameQuery);

  return (
    <h2 className={header} data-testid="customer-name">
      {loading || !data || !data.customer ? (
        <LoadingLine />
      ) : (
        t(`Hi, {firstName} {lastName}`, {
          firstName: data.customer.billingAddress.firstName,
          lastName: data.customer.billingAddress.lastName
        })
      )}
    </h2>
  );
};
