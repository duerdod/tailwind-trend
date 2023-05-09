import t from '@jetshop/intl';
import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import PriceHistoryQuery from './PriceHistoryQuery.gql';
import { styled } from 'linaria/react';
import { Price } from '@jetshop/ui/Price';

import { FlyoutTrigger } from '@jetshop/ui/Modal/Flyout';
import { FlyoutTarget } from '@jetshop/ui/Modal/Flyout';
import ChannelContext from '@jetshop/core/components/ChannelContext/ChannelContext';

const Wrapper = styled.div`
  --innerFontSize: 0.85rem;
  position: relative;

  .label {
    font-size: 0.75rem;
    cursor: pointer;
    background: transparent;
  }

  .price-table {
    position: absolute;
    padding: 0.35rem 0.9rem;
    background: white;
    border: 1px solid #e5e5e5;
    max-height: 30rem;
    overflow: scroll;
    z-index: 2;
    min-width: 14rem;
    max-width: 18rem;

    .label {
      font-size: var(--innerFontSize);
    }

    li {
      display: flex;
      justify-content: space-between;

      .timestamp {
        font-size: var(--innerFontSize);
      }

      [data-flight-price=''] {
        > .price {
          font-size: var(--innerFontSize);
          font-weight: normal;
        }
      }
    }
  }
`;

export function PriceHistoryWrapper(props) {
  return (
    <Wrapper>
      <FlyoutTrigger
        id="price-history-flyout"
        coverStyles={{ zIndex: 0, background: 'transparent' }}
      >
        {({ isOpen, hideTarget, showTarget }) => (
          <button
            onClick={() => {
              if (isOpen) {
                hideTarget();
              } else {
                showTarget();
              }
            }}
            className="label"
          >
            {t('View price history')}
          </button>
        )}
      </FlyoutTrigger>
      <FlyoutTarget id="price-history-flyout">
        {() => <PriceHistory {...props} />}
      </FlyoutTarget>
    </Wrapper>
  );
}

const days = 30;
function PriceHistory({ articleNumber, variant }) {
  const { error, loading, data } = useQuery(PriceHistoryQuery, {
    variables: { articleNumber, days },
    errorPolicy: 'all',
    skip: !articleNumber
  });

  if (loading || error) {
    return (
      <div className="price-table">
        {loading && (
          <span className="label">
            {t('Getting the last { days } days price changes...', {
              days
            })}
          </span>
        )}
        {error && <span className="label">{t('Something went wrong')}</span>}
      </div>
    );
  }

  const { product } = data;

  if (!variant) {
    return <Table history={product.history} days={days} />;
  }

  const selectedVariant = product.variants.values.find(
    value => value.articleNumber === variant.articleNumber
  );

  return <Table history={selectedVariant.history} days={days} />;
}

const Table = ({ history, days }) => {
  const { selectedChannel } = useContext(ChannelContext);

  if (history?.previousPrice?.length === 0) {
    return (
      <div className="price-table">
        <span className="label">
          {t('The price has not changed in the last { days } days', { days })}
        </span>
      </div>
    );
  }

  return (
    <div className="price-table">
      <ul>
        {history.previousPrice.map(({ timestamp, price }) => (
          <li key={timestamp}>
            <span className="timestamp">
              {new Date(timestamp).toLocaleDateString([
                selectedChannel.language.culture
              ])}
            </span>
            <Price price={price} as="span" />
          </li>
        ))}
      </ul>
    </div>
  );
};
