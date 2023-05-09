import React, { useMemo, useEffect, useRef, useState } from 'react';
import { theme } from '../../../Theme';
import { ReactComponent as FilterIcon } from '../../../../svg/Filter.svg';
import { styled } from 'linaria/react';

const ButtonWrapper = styled('div')`
  display: flex;
  justify-content: flex-end;
  right: 2rem;
  ${theme.below.sm} {
    right: 0.75rem;
  }
`;

const Button = styled('button')`
  position: absolute;
  z-index: 9;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  text-transform: uppercase;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  outline: none;
  margin-top: -8px;
  p {
    transition: all 0.2s ease;
    padding-right: 10px;
  }
  &.fixed {
    top: 32px;
    position: fixed;
  }
`;

const StyledFilterIcon = styled(FilterIcon)`
  background: ${theme.colors.blue};
  border-radius: 50%;
  padding: 10px;
  width: 40px;
  height: 40px;
  position: relative;
`;

const Badge = styled('div')`
  position: absolute;
  display: block;
  top: -7px;
  background: black;
  color: white;
  padding: 2px 4px;
  border-radius: 4px;
  left: 2px;
  font-size: 0.8rem;
  z-index: 2;
  line-height: 0.9rem;
`;

const IconWrapper = styled('div')`
  position: relative;
  pointer-events: auto;
  line-height: 0;
`;

const FilterButton = ({ showTarget, filters }) => {
  const buttonWrapperElem = useRef(null);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    function scroll() {
      const elemYPos = buttonWrapperElem.current.getBoundingClientRect().y;
      if (elemYPos <= 32) setIsFixed(true);
      else setIsFixed(false);
    }
    window.addEventListener('scroll', scroll);
    return () => {
      window.removeEventListener('scroll', scroll);
    };
  });

  const numOfActiveFilters = useMemo(() => {
    let activeFilters = 0;
    filters.forEach(filter => {
      switch (filter.__typename) {
        case 'ListFilter':
        case 'MultiListFilter':
          if (filter.hasActiveItems) activeFilters++;
          break;
        case 'NumericRangeFilter':
          if (filter.isActive) activeFilters++;
          break;
        case 'BooleanFilter':
          if (filter.value) activeFilters++;
          break;
        default:
          break;
      }
    });

    return activeFilters;
  }, [filters]);

  return (
    <ButtonWrapper ref={buttonWrapperElem}>
      <Button onClick={showTarget} className={isFixed ? 'fixed' : ''}>
        <IconWrapper>
          {numOfActiveFilters > 0 && <Badge>{numOfActiveFilters}</Badge>}
          <StyledFilterIcon />
        </IconWrapper>
      </Button>
    </ButtonWrapper>
  );
};

export default FilterButton;
