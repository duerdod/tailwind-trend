import t from '@jetshop/intl';
import {
  DropdownMenuButton,
  DropdownMenuItem,
  DropdownMenuItems
} from '@jetshop/ui/DropdownMenu';
import { FilterDropdownMenu } from './FilterDropdownMenu';
import { StyledCheck } from '@jetshop/ui/Select/Components';
import * as React from 'react';
import { useSortOrder } from '@jetshop/core/hooks/Filters/useSortOrder';

import ErrorBoundary from '@jetshop/ui/ErrorBoundary/Generic';
import PassThrough from '@jetshop/ui/ErrorBoundary/PassThrough';
import { ReactComponent as Carot } from '@jetshop/ui/svg/Carrot.svg';

export const SortOrders = ({ sortOrders }) => {
  if (sortOrders.length === 0) return null;

  return (
    <ErrorBoundary component={PassThrough}>
      <SortOrderDropdown sortOrders={sortOrders} />
    </ErrorBoundary>
  );
};

function SortOrderDropdown({ sortOrders }) {
  const { mappedSortOrder, changeSortOrder, sortOrder, direction } =
    useSortOrder({ sortOrders });

  const activeItem = mappedSortOrder.find(
    item => item.direction === direction && item.value === sortOrder
  );

  return (
    <FilterDropdownMenu style={{ marginRight: 0 }}>
      <DropdownMenuButton>
        <span>{activeItem ? activeItem.text : t('Sort By')}</span>
        <Carot className="carot" />
      </DropdownMenuButton>
      <DropdownMenuItems>
        {mappedSortOrder.map(sortItem => {
          return (
            <DropdownMenuItem
              onSelect={() =>
                changeSortOrder(sortItem.value, sortItem.direction)
              }
              key={`${sortItem.value}-${sortItem.direction}`}
            >
              {sortItem.text}
              {activeItem === sortItem && <StyledCheck />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuItems>
    </FilterDropdownMenu>
  );
}
