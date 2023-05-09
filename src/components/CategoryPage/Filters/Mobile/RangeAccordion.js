import React from 'react';
import { RangeSlider } from '../RangeFilters';
import { ActiveCarot } from './ActiveCarot';
import { filterName } from './shared/styles';

export const RangeAccordion = ({
  filters,
  accordionProps,
  startingIdx = 0
}) => {
  const rangeFilters = filters.filter(
    filter => filter.__typename === 'NumericRangeFilter'
  );
  if (rangeFilters.length === 0) return null;

  return rangeFilters.map((rangeFilter, idx) => (
    <RangeFilter
      key={rangeFilter.id}
      rangeFilter={rangeFilter}
      idx={idx}
      accordionProps={accordionProps}
      startingIdx={startingIdx}
    ></RangeFilter>
  ));
};

function RangeFilter({ rangeFilter, idx, accordionProps, startingIdx }) {
  const accordionIsOpen = accordionProps.openIndexes.includes(
    idx + startingIdx
  );
  const { AccordionContent } = accordionProps;

  return (
    <React.Fragment>
      <div
        className={filterName}
        onClick={() => accordionProps.handleClick(idx + startingIdx)}
      >
        {rangeFilter.name}
        <ActiveCarot isActive={rangeFilter.isActive} isOpen={accordionIsOpen} />
      </div>
      <AccordionContent isOpen={accordionIsOpen}>
        {/* Re-use the desktop range slider UI */}
        <RangeSlider filter={rangeFilter} />
      </AccordionContent>
    </React.Fragment>
  );
}
