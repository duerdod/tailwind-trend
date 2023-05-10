import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import PaginationContext from '@jetshop/core/components/Pagination/PaginationContext';
import getBreakpointsFromValues from '@jetshop/core/helpers/getBreakpointsFromValues';
import { Above } from '../Breakpoints/Breakpoints';
import { SnappyReactGrid } from 'snappy-react-grid';
import { useShopConfig } from '@jetshop/core/hooks/useShopConfig';

const SnappyReactGridWithId = SnappyReactGrid as any;

interface WindowGridProps {
  id?: string;
  items: any[];
  className?: string;
  prevOffset: number;
  itemsPerRow?: number | number[];
  component: any;
}

function WindowGridInner({
  id,
  items,
  className = '',
  prevOffset,
  itemsPerRow = 0,
  component
}: WindowGridProps) {
  // Keep pagination in URL in sync with scrolling
  const { perPage, goToPage, currentPage } = useContext(PaginationContext);

  const [scrollOffsetPage, setScrollOffsetPage] = useState(null);

  // Updates the url query, the history and triggers a refetch for products
  const updateHistory = useCallback(
    ({ firstVisibleIndex }: any) => {
      const pageForIndex = Math.floor(
        (firstVisibleIndex + (prevOffset + perPage)) / perPage + 1
      );

      setScrollOffsetPage(pageForIndex);
    },
    [perPage, prevOffset]
  );

  useEffect(() => {
    if (scrollOffsetPage && scrollOffsetPage !== currentPage) {
      goToPage(scrollOffsetPage, { replace: true });
    }
  }, [scrollOffsetPage, currentPage, goToPage]);

  return (
    <div data-testid="product-grid">
      <SnappyReactGridWithId
        id={id}
        className={`product-grid ${className}`}
        columns={itemsPerRow}
        items={items}
        component={component}
        onScroll={updateHistory}
        defaultVisible={perPage || 16}
      />
    </div>
  );
}

const WindowGridWrapper: FC<WindowGridProps> = ({
  itemsPerRow = [2, null, 3, 4],
  ...props
}) => {
  const {
    theme: { breakpoints: themeBreakpoints }
  } = useShopConfig();

  if (Array.isArray(itemsPerRow)) {
    const breakpoints = getBreakpointsFromValues(
      itemsPerRow,
      Object.keys(themeBreakpoints)
    );

    // Walk down each breakpoint until we find a match, starting at the biggest.
    // This should be rewritten whenever we have support for media queries in hooks.
    return breakpoints.reduce(
      (acc, cur) => (
        <Above breakpoint={cur.breakpoint}>
          {match => {
            if (match) {
              return <WindowGridInner itemsPerRow={cur.value} {...props} />;
            } else {
              return acc;
            }
          }}
        </Above>
      ),
      // Fallback to the smallest breakpoint
      <WindowGridInner itemsPerRow={breakpoints[0].value} {...props} />
    );
  }

  return null;
};

export const WindowGrid = WindowGridWrapper;
