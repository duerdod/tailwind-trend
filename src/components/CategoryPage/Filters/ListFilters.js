import { useListFilter } from '@jetshop/core/hooks/Filters/useListFilter';
import t from '@jetshop/intl';
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

export function ListFilters({ filters }) {
  const listFilters = filters.filter(
    filter => filter.__typename === 'ListFilter'
  );

  if (listFilters.length === 0) return null;

  return listFilters.map(filter => (
    <ErrorBoundary component={PassThrough} key={filter.id}>
      <ListFilter filter={filter} />
    </ErrorBoundary>
  ));
}

function ListFilter({ filter }) {
  const { apply, clear } = useListFilter({ filter });
  const onSelect = value => () => apply({ value });

  return (
    <FilterDropdownMenu>
      <Button>
        <span>{filter.name}</span>
        {filter.hasActiveItems ? <Check /> : <Carot className="carot" />}
      </Button>
      <Items as="ul">
        {filter.items.map(item => (
          <DropdownMenuItem
            key={item.id}
            onSelect={item.resultCount > 0 && onSelect(item.value)}
            style={
              item.resultCount === 0
                ? {
                    opacity: 0.4,
                    cursor: 'not-allowed'
                  }
                : { cursor: 'pointer' }
            }
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
                clear();
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
