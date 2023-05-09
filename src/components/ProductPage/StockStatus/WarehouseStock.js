import React, { useState } from 'react';
import { styled } from 'linaria/react';
import { cx } from 'linaria';
import t from '@jetshop/intl';
import { ReactComponent as StoreIcon } from '../../../svg/Store.svg';
import { ReactComponent as Caret } from '../../../svg/Caret.svg';
import StockOrb from './StockOrb';
import { theme } from '../../Theme';

const WarehouseStockWrapper = styled('div')`
  display: block;
  width: 100%;
  padding: 1em 0px;
  background: ${theme.colors.white};
  border-radius: 4px;
  margin: 16px 0;
  .wrapper {
    position: relative;
  }

  .stock-status-header {
    margin: 0px 1em;
    display: inline-flex;
    align-items: center;
    margin-bottom: 0.25em;

    .header-title {
      padding-top: 3px;
      font-size: 1rem;
      letter-spacing: 0.05em;
      color: ${theme.colors.darkgrey};
    }

    .store-icon {
      margin-right: 12px;
      width: 20px;
    }
  }

  .stock-status-info {
    margin-top: 0.25em;
    margin-left: 1em;
    margin-right: 1em;
    font-size: 0.875rem;
    line-height: 1.8;
    color: ${theme.colors.darkerGrey};
  }

  ul.warehouse-list {
    display: block;
    padding-bottom: 45px;
    overflow: hidden;
    margin-left: 1em;
    margin-right: 1em;
    margin-top: 0.8rem;

    & > li + li {
      margin-top: 0.625rem;
    }
  }

  .warehouse-list-item {
    display: flex;
    align-items: center;
    height: auto;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.4;
    color: ${theme.colors.darkgrey};

    .warehouse-name {
      flex-basis: 55%;
    }

    .warehouse-stock {
      flex-basis: 35%;
      flex-grow: 1;
      display: inline-flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: nowrap;
      white-space: nowrap;

      .variant-size {
        margin-right: 0.5rem;
      }
      .stock-status-text {
        margin-left: 0.875em;
        font-weight: 400;
        letter-spacing: 0.01em;
      }
    }

    ${theme.below.md} {
      flex-direction: column;
      padding-bottom: 0.6em;
      margin-bottom: 0.6em;

      .warehouse-name {
        width: 100%;
      }

      .warehouse-stock {
        width: 100%;
      }
    }
  }

  .toggle-list {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2.2rem;
    padding-top: 0.65rem;
    border: 0;
    outline: 0;
    font-size: 0.938em;
    text-align: center;
    letter-spacing: 0.05em;
    color: ${theme.colors.grey};
    background: ${theme.colors.white};
    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
      color: ${theme.colors.black};
    }

    :hover svg path {
      stroke: ${theme.colors.black};
    }

    svg {
      margin-left: 0.65em;
      width: 12px;
      transition: transform 0.3s ease;
      path {
        stroke: ${theme.colors.grey};
      }
    }
  }

  .toggle-expanded {
    color: ${theme.colors.black};

    svg {
      transform: rotate(180deg);
      path {
        stroke: ${theme.colors.black};
      }
    }
  }
`;

const Overlay = styled('div')`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(248, 247, 243, 0) 0%,
    rgb(248, 248, 248) 100%
  );
  transition: opacity 200ms ease;
  opacity: 1;
  pointer-events: none;
  &.open {
    opacity: 0;
  }
`;

const WarehouseStock = ({ product, variantHandler }) => {
  if (!product.hasVariants) {
    return product.warehouseStock ? (
      <WarehouseStockItem item={product} validation={true} />
    ) : null;
  }

  const hasWarehouseStock = product?.variants?.values.some(
    value => value.warehouseStock.length > 0
  );

  if (!hasWarehouseStock) return null;

  const {
    selectedVariant: selectedVariation,
    getMissingOptions,
    validation
  } = variantHandler;

  const missingOptions = !selectedVariation
    ? getMissingOptions()
        .map(option => option.name)
        .join(', ')
    : '';

  return (
    <WarehouseStockItem
      item={selectedVariation}
      missingOptions={missingOptions}
      validation={validation}
    />
  );
};

const WarehouseStockItem = ({ item, missingOptions, validation }) => {
  return (
    <WarehouseStockWrapper className="warehouse-stock-wrapper">
      <p className="stock-status-header">
        <span className="store-icon">
          <StoreIcon />
        </span>
        <span className="header-title">{t('Find product in store')}</span>
      </p>
      <WarehouseValidation
        validation={validation}
        missingOptions={missingOptions}
        item={item}
      />
    </WarehouseStockWrapper>
  );
};

function WarehouseValidation({ validation, missingOptions, item }) {
  const initialItemsToShow = 3;
  const [itemsToShow, setItemsToShow] = useState(initialItemsToShow);
  const expanded = itemsToShow !== initialItemsToShow;
  const showExpand = initialItemsToShow < item?.warehouseStock.length;

  function toggleList() {
    if (expanded) {
      setItemsToShow(initialItemsToShow);
    } else {
      setItemsToShow(item.warehouseStock.length);
    }
  }

  // Handle article number for products with multiple variants
  const productVariant = item?.values?.join('-');
  if (validation === 'incomplete') {
    return (
      <p className="stock-status-info">
        {t('Select {missingOptions} to see store status in store', {
          missingOptions: missingOptions
        })}
      </p>
    );
  } else if (item.warehouseStock.length > 0) {
    return (
      <div className="wrapper">
        <ul className="warehouse-list">
          {item.warehouseStock.slice(0, itemsToShow).map(warehouse => (
            <WarehouseStockItemContent
              warehouse={warehouse}
              productVariant={productVariant}
              key={warehouse.location?.id}
            />
          ))}
        </ul>
        {showExpand && <Overlay className={expanded ? 'open' : ''} />}
        {showExpand && (
          <button
            className={cx('toggle-list', expanded && 'toggle-expanded')}
            onClick={toggleList}
          >
            {expanded ? t('Show fewer stores') : t('View all stores')}
            <Caret />
          </button>
        )}{' '}
      </div>
    );
  } else if (validation === 'outOfStock') {
    return (
      <p className="stock-status-info">{t('This product is out of stock.')}</p>
    );
  } else {
    return null;
  }
}

const WarehouseStockItemContent = ({ warehouse, productVariant }) => {
  let itemStockStatus, stockStatusText;

  if (warehouse.stockLevel >= 1) {
    stockStatusText = t('In Stock');
    itemStockStatus = 'inStock';
  }
  if (warehouse.stockLevel === 0) {
    stockStatusText = t('Out of Stock');
    itemStockStatus = 'outOfStock';
  }

  return (
    <li className="warehouse-list-item">
      <div className="warehouse-name">
        <span>{warehouse.location?.name}</span>
      </div>
      <div className="warehouse-stock">
        {productVariant && (
          <span className="variant-size">{productVariant}</span>
        )}
        <StockOrb status={itemStockStatus} />
        <span className="stock-status-text">{stockStatusText}</span>
      </div>
    </li>
  );
};

export default WarehouseStock;
