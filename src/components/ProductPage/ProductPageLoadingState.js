import React from 'react';
import { Container } from './styledComponents';
import { ProductSection } from './ProductInfo';
import { LoadingLine } from '@jetshop/ui/Loading/LoadingLine';
import { styled } from 'linaria/react';

const MockImage = styled('div')`
  padding-top: 100%;
  background: #f6f6f6;
`;
const MockThumbnails = styled('div')`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
`;
const MockThumbnail = styled('div')`
  width: 22%;
`;

export default function ProductPageLoadingState() {
  return (
    <Container
      style={{
        marginTop: '2'
      }}
    >
      <ProductSection>
        <MockImage />
        <MockThumbnails>
          <MockThumbnail>
            <MockImage />
          </MockThumbnail>
          <MockThumbnail>
            <MockImage />
          </MockThumbnail>
          <MockThumbnail>
            <MockImage />
          </MockThumbnail>
          <MockThumbnail>
            <MockImage />
          </MockThumbnail>
        </MockThumbnails>
      </ProductSection>
      <ProductSection>
        <LoadingLine
          heightPx={24}
          widthRem={15}
          style={{
            marginBottom: '12px'
          }}
        />
        <LoadingLine
          heightPx={16}
          style={{
            marginBottom: '14px'
          }}
        />
        <LoadingLine
          heightPx={12}
          widthRem={10}
          style={{
            marginBottom: '31px'
          }}
        />
        <LoadingLine
          heightPx={12}
          widthRem={14}
          count={2}
          style={{
            marginBottom: '8px'
          }}
        />
        <LoadingLine
          heightPx={24}
          style={{
            marginTop: '16px',
            marginBottom: '14px'
          }}
        />

        <LoadingLine
          heightPx={54}
          widthRem={50}
          style={{
            marginTop: '16px',
            marginBottom: '14px'
          }}
        />
      </ProductSection>
    </Container>
  );
}
