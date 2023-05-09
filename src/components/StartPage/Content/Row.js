import React from 'react';
import MaxWidth from '../../Layout/MaxWidth';
import { styled } from 'linaria/react';
import { theme } from '../../Theme';

const Container = styled('div')`
  position: relative;
  padding-top: 48px;
  padding-bottom: 62px;
  ${theme.below.sm} {
    padding-top: 32px;
    padding-bottom: 38px;
  }
`;

export const Title = styled('h2')`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 0.75rem;
  ${theme.below.md} {
    font-size: 18px;
  }
`;

const ItemsContainer = styled('div')`
  display: flex;
  overflow-x: auto;

  margin-right: -12px;
  margin-left: -12px;

  ${theme.above.xl} {
    justify-content: center;
  }
`;

const Row = ({ header, children }) => {
  return (
    <MaxWidth>
      <Container>
        {header && <Title>{header.value}</Title>}
        <ItemsContainer>{children}</ItemsContainer>
      </Container>
    </MaxWidth>
  );
};

export default Row;
