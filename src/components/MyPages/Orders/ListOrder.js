import t from '@jetshop/intl';
import { LoadingLine } from '@jetshop/ui/Loading/LoadingLine';
import React from 'react';
import { styled } from 'linaria/react';
import { cx } from 'linaria';
import { Price } from '@jetshop/ui/Price';
import { ListDetail } from './OrderDetail/ListDetail';
import { ReactComponent as Box } from '../../../svg/Box.svg';

import { theme } from '../../Theme';

const StyledListOrder = styled('section')`
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  background: white;
  border-radius: 3px;
  display: grid;
  grid-template-columns: 6rem 1fr;
  grid-template-rows: 1fr;
  grid-template-areas:
    'image details'
    'image actions'
    'full full';

  ${theme.below.md} {
    grid-template-areas:
      'image details'
      'actions actions'
      'full full';
  }

  &.empty {
    opacity: 0.4;
  }

  .order-image {
    grid-area: image;
    justify-content: center;
    align-items: center;
    display: flex;

    svg {
      width: 2em;
      height: 2em;
    }
  }

  .order-details {
    grid-area: details;
    padding: 1em;
    display: flex;
    section {
      margin-right: 10%;
      flex: 1 1 33%;
    }

    ${theme.below.md} {
      margin: 0;
      flex-direction: column;
      section + section {
        margin-top: 1em;
        margin-right: 0;
      }
    }
  }

  .order-actions {
    grid-area: actions;
    display: flex;
    border-top: 1px solid #f0f0f0;

    ${theme.below.sm} {
      flex-direction: column;
      border-top: 0;
      section,
      a {
        display: block;
        border-left: 0;
      }
    }

    section,
    button {
      padding: 0 1rem;
      height: 3rem;
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }
    .actions {
      margin-left: auto;
      ${theme.below.sm} {
        margin-left: 0;
      }
    }

    button {
      text-decoration: none;
      border-left: 1px solid #f0f0f0;
      text-transform: uppercase;
      font-size: 0.75em;
      color: ${theme.colors.darkgrey};
      cursor: pointer;
      background: transparent;

      ${theme.below.sm} {
        text-align: center;
        display: flex;
        border-top: 1px solid #f0f0f0;
        text-transform: none;
        font-size: 0.875em;
        width: 100%;
        border-left: 0;
      }
    }
  }

  .order-status {
    color: ${theme.colors.blue};
    font-weight: 600;

    ${theme.below.sm} {
      background: #f8f8f8;
      margin: 1em;
    }
  }

  h3 {
    font-size: 0.75em;
    text-transform: uppercase;
    color: #777777;
    margin-bottom: 0.5em;
  }

  .full-detail {
    grid-area: full;
    border-top: 1px solid ${theme.colors.tablegrey};
    padding-top: 1em;
  }
`;

export function ListOrder({
  order,
  index,
  placeholder = false,
  showFullDetail = false,
  className
}) {
  const [expanded, setExpanded] = React.useState(showFullDetail);

  const toggle = () => setExpanded(state => !state);

  return (
    <StyledListOrder className={cx('list-order', className)}>
      <div className="order-image">
        <Box />
      </div>
      <div className="order-details">
        <section>
          <h3>{t('Order Number')}</h3>
          {placeholder ? <LoadingLine /> : order.orderNumber}
        </section>

        <section>
          <h3>{t('Order Date')}</h3>
          {placeholder ? <LoadingLine /> : order.orderDate}
        </section>

        <section>
          <h3>{t('Total Price')}</h3>
          {placeholder ? (
            <LoadingLine />
          ) : (
            <Price price={order.total} currency={order.currency.format} />
          )}
        </section>
      </div>
      <div className="order-actions">
        <section className="order-status">
          {placeholder ? <LoadingLine /> : order.status.description}
        </section>

        {!placeholder && order.hasOrderDetails && (
          <div className="actions">
            {expanded ? (
              <button onClick={toggle}>{t('Show less')}</button>
            ) : (
              <button onClick={toggle}>{t('Show details')}</button>
            )}
          </div>
        )}
      </div>

      {expanded && order && (
        <ListDetail id={order.id} className="full-detail" />
      )}
    </StyledListOrder>
  );
}
