import { ReactComponent as Check } from '@jetshop/ui/svg/Check.svg';
import { css } from 'linaria';
import React from 'react';
import { ActiveCarot } from './ActiveCarot';
import { filterName } from './shared/styles';
import { useListFilter } from '@jetshop/core/hooks/Filters/useListFilter';

export const filtersStyle = css`
  list-style: none;
  li button {
    padding: 1em;
    width: 100%;
    display: flex;
    background: transparent;
    border-top: 1px solid white;
    background: #f0f0f0;
    justify-content: space-between;
    align-items: center;
    span {
      /* result count */
      font-size: 0.75em;
    }
  }
`;

export const ListAccordion = ({ filters, accordionProps, startingIdx = 0 }) => {
  if (!filters) return null;

  const listFilters = filters.filter(
    filter => filter.__typename === 'ListFilter'
  );

  return (
    <>
      {listFilters.map((filter, idx) => (
        <ListFilter
          key={filter.id}
          filter={filter}
          idx={idx}
          startingIdx={startingIdx}
          accordionProps={accordionProps}
        />
      ))}
    </>
  );
};

function ListFilter({ filter, idx, accordionProps, startingIdx }) {
  const { apply } = useListFilter({ filter });
  const { AccordionContent } = accordionProps;
  const accordionIsOpen = accordionProps.openIndexes.includes(
    idx + startingIdx
  );

  return (
    <>
      <div
        className={filterName}
        onClick={() => accordionProps.handleClick(idx)}
      >
        {filter.name}
        <ActiveCarot
          isActive={filter.hasActiveItems}
          isOpen={accordionIsOpen}
        />
      </div>
      <AccordionContent isOpen={accordionIsOpen}>
        <ul className={filtersStyle}>
          {filter.items.map(item => (
            <li key={item.id}>
              <button onClick={() => apply({ value: item.value })}>
                {item.text}

                {item.isActive ? <Check /> : <span>{item.resultCount}</span>}
              </button>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </>
  );
}
