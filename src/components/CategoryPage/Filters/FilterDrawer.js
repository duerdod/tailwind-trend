import { Intl } from '@jetshop/intl';
import Accordion from '@jetshop/ui/Accordion/Accordion';
import React from 'react';
import { styled } from 'linaria/react';
import { css } from 'linaria';
import { BooleanFilters } from './BooleanFilters';
import { ListAccordion } from './Mobile/ListAccordion';
import { RangeAccordion } from './Mobile/RangeAccordion';
import { SortOrderAccordion } from './Mobile/SortOrderAccordion';
import { useFilters } from '@jetshop/core/hooks/Filters/useFilters';
import { ClearButton } from './ActiveFilters';
import t from '@jetshop/intl';
import Button from '../../ui/Button';

const Title = styled('h1')`
  color: black;
  font-size: 1.125rem;
  text-align: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e8e8e8;
  font-weight: 600;
`;

const Wrapper = styled('div')`
  button {
    padding: 0 1rem;
    border-width: 1px 0 0 0;
  }
`;

const ButtonContainer = styled('div')`
  padding: 1em;
  > button {
    width: calc(50% - 0.5em);
    border-radius: 0;
    height: 36px;

    &:last-of-type {
      margin: 0 0 0 0.5em;
    }

    &:first-of-type {
      margin: 0 0.5em 0 0;
    }
  }
`;

const boolFilters = css`
  padding: 1rem;
  label {
    margin-top: 0.5em;
  }
`;

const FilterDrawer = ({ filters, sortOrders, close, ...props }) => {
  const { clearAllFilters } = useFilters();
  const isActiveListFilter = filters.some(listFilter => {
    return listFilter.hasActiveItems;
  });

  const listFilters = (filters || []).filter(
    filter => filter.__typename === 'ListFilter'
  );

  const rangeFilters = (filters || []).filter(
    filter => filter.__typename === 'NumericRangeFilter'
  );

  const isFilters = !!filters;
  const isSortOrders = sortOrders.length > 0;

  return (
    <section {...props}>
      {(isFilters || isSortOrders) && (
        <>
          <Wrapper>
            <Title>
              <Intl>
                {t =>
                  isFilters && isSortOrders
                    ? `${t('Filter')} & ${t('Sort by')}`
                    : isFilters
                    ? t('Filter')
                    : t('Sort by')
                }
              </Intl>
            </Title>
            <Accordion single>
              {accordionProps => (
                <>
                  {isFilters && (
                    <>
                      <ListAccordion
                        filters={filters}
                        accordionProps={accordionProps}
                      />
                      <RangeAccordion
                        filters={filters}
                        accordionProps={accordionProps}
                        startingIdx={listFilters.length}
                      />
                    </>
                  )}
                  {isSortOrders && (
                    <SortOrderAccordion
                      sortOrders={sortOrders}
                      accordionProps={accordionProps}
                      startingIdx={listFilters.length + rangeFilters.length}
                    />
                  )}
                  {isFilters && (
                    <div className={boolFilters}>
                      <BooleanFilters filters={filters} />
                    </div>
                  )}
                </>
              )}
            </Accordion>
          </Wrapper>

          <ButtonContainer>
            <Button onClick={close}>{t('Apply filters')}</Button>
            {isActiveListFilter && (
              <ClearButton type="button" onClick={clearAllFilters}>
                {t('Clear all filters')}
              </ClearButton>
            )}
          </ButtonContainer>
        </>
      )}
    </section>
  );
};
export default FilterDrawer;
