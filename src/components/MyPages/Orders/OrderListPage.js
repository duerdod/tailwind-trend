import Head from '@jetshop/core/components/Head';
import useCustomerOrdersQuery from '@jetshop/core/hooks/useCustomerOrdersQuery';
import t from '@jetshop/intl';
import * as React from 'react';
import { styled } from 'linaria/react';
import { smallCaps } from '../../ui/Headings';
import CustomerOrders from './CustomerOrders.gql';
import { ListOrder } from './ListOrder';
import { Intl } from '@jetshop/intl';

import { theme } from '../../Theme';

const OrderListPageWrapper = styled('div')`
  h1 {
    margin-bottom: 2em;
    ${theme.below.sm} {
      margin-bottom: 1em;
    }
  }
  &.main-wrapper {
    ${theme.below.sm} {
      margin-top: 12px;
      padding-left: 12px;
      padding-right: 12px;
    }
  }
`;

export default function OrderListPage() {
  const { orders, loading, totalOrders } = useCustomerOrdersQuery({
    query: CustomerOrders
  });

  if (loading) {
    return (
      <OrderListPageWrapper className="main-wrapper">
        <Heading />
        <ListOrder placeholder={true} />
      </OrderListPageWrapper>
    );
  }

  if (!loading && orders.length === 0) {
    return (
      <OrderListPageWrapper className="main-wrapper">
        <Heading />
        <p style={{ marginBottom: '2em' }}>{t('No orders found')}</p>
        <ListOrder placeholder={true} className="empty" />
      </OrderListPageWrapper>
    );
  }

  return (
    <OrderListPageWrapper className="main-wrapper">
      <Heading totalOrders={totalOrders} />
      {orders.map((order, idx) => (
        <ListOrder
          order={order}
          key={order.id}
          index={orders.length - idx}
          style={{ marginTop: idx > 0 ? '2em' : 0 }}
        />
      ))}
    </OrderListPageWrapper>
  );
}

function Heading({ totalOrders }) {
  return (
    <>
      <Intl>
        {t => <Head data={{ title: t('My Orders'), metaTags: [] }} />}
      </Intl>

      <h1 className={smallCaps}>
        {t('My Orders')} {totalOrders && <>({totalOrders})</>}
      </h1>
    </>
  );
}
