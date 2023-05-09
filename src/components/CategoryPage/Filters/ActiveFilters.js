import { useFilters } from '@jetshop/core/hooks/Filters/useFilters';
import { useListFilter } from '@jetshop/core/hooks/Filters/useListFilter';
import t from '@jetshop/intl';
import { ReactComponent as Cross } from '@jetshop/ui/svg/Cross.svg';
import React from 'react';
import { styled } from 'linaria/react';

import { theme } from '../../Theme';

export const FilterGroup = styled('div')`
  font-size: 0.875rem;
`;
const Label = styled('label')`
  font-weight: 300;
  padding-right: 0.25rem;
  text-transform: capitalize;
`;
const Value = styled('span')`
  font-weight: 600;
  padding-right: 1rem;
`;
export const AppliedFilter = styled('button')`
  color: white;
  border: 0;
  padding: 0.5rem;
  margin: 0.5rem;
  display: inline-flex;
  background-color: ${theme.colors.blue};
  height: 36px;
  align-items: center;
`;

export const FilterWrapper = styled('aside')`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.5rem;
`;

export const ClearButton = styled('button')`
  background: none;
  text-decoration: underline;
  margin-left: 0.5rem;
  width: 160px;
  height: 36px;
  border: 1px solid ${theme.colors.blue};
  color: ${theme.colors.blue};
  margin: 0.5rem;
  text-decoration: none;
  :hover,
  :focus {
    opacity: 0.8;
    outline: none;
  }
`;

export function ActiveFilters({ filters }) {
  const { clearAllFilters } = useFilters();

  if (!filters) return null;

  const activeListFilters = filters.filter(listFilter => {
    return listFilter.hasActiveItems;
  });

  if (activeListFilters.length === 0) return null;

  return (
    <FilterWrapper>
      {activeListFilters.map(listFilter => {
        return (
          <FilterGroup key={listFilter.id}>
            {listFilter.items
              .filter(item => item.isActive)
              .map(listFilterItem => (
                <ActiveListFilterItem
                  item={listFilterItem}
                  listFilter={listFilter}
                  key={listFilterItem.value}
                />
              ))}
          </FilterGroup>
        );
      })}
      <ClearButton type="button" onClick={clearAllFilters}>
        {t('Clear all filters')}
      </ClearButton>
    </FilterWrapper>
  );
}

function ActiveListFilterItem({ item, listFilter }) {
  const { apply } = useListFilter({ filter: listFilter });
  return (
    <AppliedFilter
      type="button"
      key={item.value}
      onClick={() => {
        apply({ value: item.value });
      }}
    >
      <Label>{listFilter.name} </Label>
      <Value>{item.text}</Value>
      <Cross />
    </AppliedFilter>
  );
}
