import { LoadingLine } from '@jetshop/ui/Loading/LoadingLine';
import React from 'react';
import { CategoryHeaderWrapper, Inner, NoImageWrapper } from './CategoryHeader';

export default React.memo(function CategoryHeaderLoadingState() {
  const backgroundColor = '#e2e2e2';
  return (
    <CategoryHeaderWrapper>
      <NoImageWrapper>
        <Inner>
          <LoadingLine
            color={backgroundColor}
            heightPx={14}
            style={{ marginBottom: '2rem' }}
          />
          <LoadingLine
            color={backgroundColor}
            widthRem={10}
            heightPx={27}
            style={{ marginBottom: '20px' }}
          />
          <LoadingLine
            color={backgroundColor}
            widthRem={25}
            randomizeWidthBy={5}
            count={2}
            heightPx={14}
            style={{ marginBottom: '0.5rem' }}
          />
        </Inner>
      </NoImageWrapper>
    </CategoryHeaderWrapper>
  );
});
