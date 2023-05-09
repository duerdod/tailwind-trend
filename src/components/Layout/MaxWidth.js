import { styled } from 'linaria/react';
import { theme } from '../Theme';

const MaxWidth = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  margin: 0 auto;
  padding: 0 0.75rem;
  position: relative;
  flex: 1 1 auto;
  width: 100%;
  max-width: 80rem;
  ${theme.above.sm} {
    padding: 0 2rem;
  }
`;

export default MaxWidth;
