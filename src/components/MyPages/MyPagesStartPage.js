import React, { Fragment } from 'react';
import { styled } from 'linaria/react';
import { ListOrder } from './Orders/ListOrder';
import CustomerOrders from './Orders/CustomerOrders.gql';
import useCustomerOrdersQuery from '@jetshop/core/hooks/useCustomerOrdersQuery';
import t from '@jetshop/intl';
import { Link } from 'react-router-dom';
import { StyledCarrot } from '@jetshop/ui/Select/Components';
import { useShopConfig } from '@jetshop/core/hooks/useShopConfig';
import Head from '@jetshop/core/components/Head';
import { Intl } from '@jetshop/intl';
import { useQuery } from '@apollo/react-hooks';
import MyPagesContent from './MyPagesContent.gql';

import { theme } from '../Theme';

const MyPagesStartPageWrapper = styled('div')`
  .list-order {
    background-color: white;
  }
  ${theme.below.sm} {
    padding: 0px;
    margin-top: 24px;
  }
  .section-wrapper {
    width: 100%;
    ${theme.below.sm} {
      padding-left: 12px;
      padding-right: 12px;
      margin-top: 24px;
    }
  }
  .section-title {
    font-weight: 600;
    font-size: 16px;
    display: flex;
    align-items: center;
    height: 40px;
  }
  .list-order {
    margin-bottom: 18px;
  }
  .show-all-orders {
    color: ${theme.colors.blue};
    font-size: 0.875em;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 2em;
    :hover {
      opacity: 0.8;
    }
    svg {
      margin-left: 0.5em;
      fill: currentColor;
    }
  }
`;

const WelcomeWrapper = styled('div')`
  margin-bottom: 38px;
`;

function StartPageOrders() {
  const { routes } = useShopConfig();
  const { orders, loading } = useCustomerOrdersQuery({
    query: CustomerOrders,
    variables: {
      first: 2
    }
  });
  if (loading) {
    return <ListOrder placeholder={true} />;
  }

  if (!loading && orders.length === 0) {
    return (
      <Fragment>
        <p style={{ marginBottom: '.5em' }}>{t('No orders found')}</p>
        <ListOrder placeholder={true} className="empty" />
      </Fragment>
    );
  }

  return (
    <>
      {orders.map(order => (
        <ListOrder order={order} key={order.id} />
      ))}
      <Link to={`${routes.myPages.path}/orders`} className="show-all-orders">
        <span>{t('Show All Orders')}</span>
        <StyledCarrot />
      </Link>
    </>
  );
}

function Welcome() {
  const { data } = useQuery(MyPagesContent);

  return (
    <WelcomeWrapper>
      {data && (
        <div
          dangerouslySetInnerHTML={{
            __html: data.myPagesContent.welcomeText
          }}
        />
      )}
    </WelcomeWrapper>
  );
}
function MyPagesStartPage() {
  return (
    <>
      <Intl>{t => <Head data={{ title: t('My Pages') }} />}</Intl>
      <MyPagesStartPageWrapper className="main-wrapper">
        <Welcome />
        <div className="section-wrapper">
          <h2 className="section-title">{t('Recent Orders')}</h2>
          <StartPageOrders />
        </div>
      </MyPagesStartPageWrapper>
    </>
  );
}

export default MyPagesStartPage;
