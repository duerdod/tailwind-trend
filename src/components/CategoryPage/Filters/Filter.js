import { Above, Below } from '@jetshop/ui/Breakpoints';
import Drawer, { DrawerTarget, DrawerTrigger } from '@jetshop/ui/Modal/Drawer';
import { SortOrders } from './SortOrders';
import { styled } from 'linaria/react';
import React, { Component } from 'react';
import { ActiveFilters } from './ActiveFilters';
import { BooleanFilters } from './BooleanFilters';
import FilterDrawer from './FilterDrawer';
import { ListFilters } from './ListFilters';
import { MultiListFilters } from './MultiListFilters';
import { RangeFilters } from './RangeFilters';
import FilterButton from './Mobile/FilterButton';

const Filters = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  > div {
    width: 224px;
    margin-right: 16px;
    position: relative;
  }
  [data-flight-dropdown-items] {
    position: absolute;
  }
`;

const FiltersSectionWrapper = styled('div')`
  display: flex;
  flex-direction: row;
`;

const FiltersWapper = styled('div')`
  width: 90%;
`;
const BoolSortWrapper = styled('div')`
  min-width: 224px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.875rem;
  > div {
    width: 224px;
    text-align: right;
    margin-bottom: 1em;
    button {
      height: 40px;
      background-color: #f7f7f7;
    }
  }
  .boolean-wrapper {
    direction: rtl;
    > label {
      margin-bottom: 6px;
      span {
        margin: 0 0 0 12px;
      }
    }
  }

  [data-flight-dropdown-items] {
    right: 0;
    left: auto;
  }
  [data-flight-dropdown-item] {
    display: flex;
    * + * {
      margin-left: auto;
    }
  }
`;

class Filter extends Component {
  render() {
    const { filters } = this.props;
    const sortOrders = this.props?.sortOrders ?? [];
    return (
      <>
        <Above breakpoint="md">
          {matches =>
            matches && (
              <>
                <FiltersSectionWrapper>
                  <FiltersWapper>
                    <Filters>
                      <ListFilters filters={filters} />
                      <RangeFilters filters={filters} />
                    </Filters>
                    <Filters>
                      <MultiListFilters filters={filters} />
                    </Filters>
                  </FiltersWapper>
                  <BoolSortWrapper>
                    <Filters>
                      <SortOrders sortOrders={sortOrders} />
                    </Filters>
                    <div className="boolean-wrapper">
                      <BooleanFilters filters={filters} />
                    </div>
                  </BoolSortWrapper>
                </FiltersSectionWrapper>
                <ActiveFilters filters={filters} />
              </>
            )
          }
        </Above>
        <Below breakpoint="md">
          {matches =>
            matches && (
              <>
                <DrawerTrigger id="filterDrawer">
                  {({ showTarget }) => (
                    <FilterButton showTarget={showTarget} filters={filters} />
                  )}
                </DrawerTrigger>

                <DrawerTarget id="filterDrawer">
                  {({ hideTarget, isOpen }) => (
                    <Drawer isOpen={isOpen} right>
                      <FilterDrawer
                        close={hideTarget}
                        filters={filters}
                        sortOrders={sortOrders}
                      />
                    </Drawer>
                  )}
                </DrawerTarget>
              </>
            )
          }
        </Below>
      </>
    );
  }
}

export default Filter;
