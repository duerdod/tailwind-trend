import {
  DropdownMenuButton as Button,
  DropdownMenuItem,
  DropdownMenuItems as Items
} from '@jetshop/ui/DropdownMenu';
import ErrorBoundary from '@jetshop/ui/ErrorBoundary/Generic';
import PassThrough from '@jetshop/ui/ErrorBoundary/PassThrough';
import { ReactComponent as Carot } from '@jetshop/ui/svg/Carrot.svg';
import { ReactComponent as Check } from '@jetshop/ui/svg/Check.svg';
import React from 'react';
import { FilterDropdownMenu } from './FilterDropdownMenu';
import { useMultiFilter } from '@jetshop/core/hooks/Filters/useMultiFilter';
import t from '@jetshop/intl';

export function MultiListFilters({ filters }) {
  const multiListFilters = filters.filter(
    filter => filter.__typename === 'MultiListFilter'
  );

  return multiListFilters.map(multiListFilter => (
    <ErrorBoundary component={PassThrough} key={multiListFilter.id}>
      {multiListFilter.lists.map((listFilter, index) => (
        <MultiListFilter
          filter={listFilter}
          multiListFilter={multiListFilter}
          index={index}
          key={listFilter.id}
        />
      ))}
    </ErrorBoundary>
  ));
}

function MultiListFilter({ filter, multiListFilter, index }) {
  const { apply, clearList } = useMultiFilter({
    filter: multiListFilter
  });

  return (
    <FilterDropdownMenu>
      <Button disabled={filter.items.length === 0}>
        <span>{filter.name}</span>
        {filter.hasActiveItems ? <Check /> : <Carot className="carot" />}
      </Button>
      <Items as="ul">
        {filter.items.map(item => (
          <DropdownMenuItem
            key={item.id}
            onSelect={({ setIsOpen }) => {
              apply({
                value: item.value,
                listIndex: index
              });
              setIsOpen(false);
            }}
          >
            <span>{item.text}</span>
            {item.isActive ? <Check /> : <span>{item.resultCount}</span>}
          </DropdownMenuItem>
        ))}
        <>
          {filter.hasActiveItems && (
            <DropdownMenuItem
              onSelect={({ setIsOpen }) => {
                setIsOpen(false);
                clearList({ listIndex: index });
              }}
            >
              {t('Clear filter')}
            </DropdownMenuItem>
          )}
        </>
      </Items>
    </FilterDropdownMenu>
  );
}
