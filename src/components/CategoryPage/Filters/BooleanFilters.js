import React from 'react';
import Checkbox from '@jetshop/ui/Checkbox';
import { useBooleanFilter } from '@jetshop/core/hooks/Filters/useBooleanFilter';

export function BooleanFilters({ filters }) {
  if (!filters) return null;

  const boolFilters = filters.filter(
    filter => filter.__typename === 'BooleanFilter'
  );

  if (boolFilters.length === 0) return null;

  return boolFilters.map(filter => (
    <BooleanFilter filter={filter} key={filter.id} />
  ));
}

function BooleanFilter({ filter }) {
  const { apply } = useBooleanFilter({ filter });
  return (
    <Checkbox
      key={filter.id}
      label={filter.name}
      checked={filter.value}
      onChange={e => {
        apply({ value: e.currentTarget.checked });
      }}
    />
  );
}
