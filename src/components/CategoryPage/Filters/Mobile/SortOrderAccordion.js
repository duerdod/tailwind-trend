import { ReactComponent as Check } from '@jetshop/ui/svg/Check.svg';
import React from 'react';
import { filterName } from './shared/styles';
import SortOrder from '@jetshop/ui/SortOrder/SortOrder';
import t from '@jetshop/intl';
import { filtersStyle } from './ListAccordion';
import { ActiveCarot } from './ActiveCarot';

export const SortOrderAccordion = ({
  sortOrders,
  accordionProps,
  startingIdx = 0
}) => {
  if (sortOrders.length === 0) return null;

  return (
    <SortOrder sortOrders={sortOrders}>
      {sortOrderOptions => (
        <SortOrderComponent
          startingIdx={startingIdx}
          accordionProps={accordionProps}
          sortOrderOptions={sortOrderOptions}
        />
      )}
    </SortOrder>
  );
};

function SortOrderComponent({ accordionProps, startingIdx, sortOrderOptions }) {
  const idx = 0; // As there is only one sort order accordion, idx is 0
  const {
    changeSortOrder,
    direction,
    sortOrder,
    mappedSortOrder
  } = sortOrderOptions;
  const { AccordionContent } = accordionProps;
  const accordionIsOpen = accordionProps.openIndexes.includes(
    idx + startingIdx
  );

  return (
    <>
      <div
        className={filterName}
        onClick={() => accordionProps.handleClick(idx + startingIdx)}
      >
        {t('Sort by')}
        <ActiveCarot isOpen={accordionIsOpen} />
      </div>
      <AccordionContent isOpen={accordionIsOpen}>
        <ul className={filtersStyle}>
          {mappedSortOrder.map(order => (
            <li key={`${order.value}-${order.direction}`}>
              <button
                onClick={() => {
                  changeSortOrder(order.value, order.direction);
                }}
              >
                {order.text}
                {direction === order.direction && sortOrder === order.value && (
                  <Check />
                )}
              </button>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </>
  );
}
