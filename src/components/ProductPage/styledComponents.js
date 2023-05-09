import { styled } from 'linaria/react';
import MaxWidth from '../Layout/MaxWidth';

const Container = styled(MaxWidth)`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;
export { Container };
