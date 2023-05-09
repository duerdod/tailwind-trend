import { useRangeFilter } from '@jetshop/core/hooks/Filters/useRangeFilter';
import t from '@jetshop/intl';
import Button from '@jetshop/ui/Button';
import {
  DropdownMenuButton,
  DropdownMenuItems
} from '@jetshop/ui/DropdownMenu';
import ErrorBoundary from '@jetshop/ui/ErrorBoundary/Generic';
import PassThrough from '@jetshop/ui/ErrorBoundary/PassThrough';
import { ReactComponent as Carrot } from '@jetshop/ui/svg/Carrot.svg';
import { ReactComponent as Check } from '@jetshop/ui/svg/Check.svg';
import { css } from 'linaria';
import React, { useState } from 'react';
import { styled } from 'linaria/react';
import ReactSlider from 'react-slider';
import { FilterDropdownMenu } from './FilterDropdownMenu';

export const RangeSliderContainer = styled('div')`
  width: 100%;
  padding: 1rem;
  background: #f7f7f7;
  z-index: 5;
  border: 1px solid #dedede;
  border-top: 0;

  .slider {
    height: 1rem;
  }

  .slider.disabled {
    opacity: 0.3;
    pointer-events: none;
  }

  .track {
    height: 1rem;
    background: transparent;
    padding-bottom: 1rem;
    &:after {
      height: 2px;
      width: 100%;
      position: absolute;
      top: 7px;
      background: silver;
      content: '';
    }
    &-1:after {
      /* The active bar section */
      background: black;
    }
  }
  .thumb {
    height: 1rem;
    width: 1rem;
    background: black;
  }
`;

const wrapper = css`
  .active-vals {
    display: flex;
    margin-bottom: 0.5rem;
    justify-content: space-between;
  }
  button {
    margin-top: 0.5rem;
  }
`;

export function RangeFilters({ filters }) {
  const rangeFilters = filters.filter(
    filter => filter.__typename === 'NumericRangeFilter'
  );

  if (rangeFilters.length === 0) return null;

  return rangeFilters.map(filter => (
    <ErrorBoundary component={PassThrough} key={filter.id}>
      <RangeFilter filter={filter} />
    </ErrorBoundary>
  ));
}

function RangeFilter({ filter }) {
  return (
    <FilterDropdownMenu>
      <DropdownMenuButton>
        <span>{filter.name}</span>
        {filter.isActive ? <Check /> : <Carrot className="carot" />}
      </DropdownMenuButton>
      <DropdownMenuItems as="div">
        <RangeSlider filter={filter} />
      </DropdownMenuItems>
    </FilterDropdownMenu>
  );
}

export function RangeSlider({ filter }) {
  const { apply, clear } = useRangeFilter({ filter });
  // Filter.value may be null (on first render). If it is, use the filter min/max as initial value
  const [initialMin, initialMax] = filter.value
    ? filter.value
    : [filter.min, filter.max];

  // // Make sure the selected min/max are never lower or higher than
  // // the available min/max respectively.
  const selectedVals = [
    Math.max(initialMin, filter.min),
    Math.min(initialMax, filter.max)
  ];
  // draftVal will be used to track the values from the slider
  const [draftVal, setDraftVal] = useState({
    min: selectedVals[0],
    max: selectedVals[1]
  });

  const [touched, setTouched] = useState(false);

  const handleUpdate = ([min, max]) => {
    setTouched(true);
    setDraftVal({ min, max });
  };
  const applyFilter = () => {
    setTouched(false);
    apply(draftVal);
  };
  const reset = () => {
    setTouched(false);
    const minMax = { min: filter.min, max: filter.max };
    setDraftVal(minMax);
    clear();
  };

  return (
    <>
      <RangeSliderContainer className={wrapper}>
        <div className="active-vals">
          <span>{draftVal.min}</span>
          <span>{draftVal.max}</span>
        </div>
        <ReactSlider
          disabled={filter.min === filter.max}
          min={filter.min}
          max={filter.max}
          minDistance={10}
          defaultValue={selectedVals}
          onChange={handleUpdate}
          value={[draftVal.min, draftVal.max]}
          withBars
        />
        {touched ? (
          <Button onClick={applyFilter}>{t('Apply')}</Button>
        ) : (
          <>
            {filter.isActive ? (
              <Button onClick={reset} className="secondary">
                {' '}
                {t('Reset')}{' '}
              </Button>
            ) : (
              <Button disabled>{t('Apply')}</Button>
            )}
          </>
        )}
      </RangeSliderContainer>
    </>
  );
}
