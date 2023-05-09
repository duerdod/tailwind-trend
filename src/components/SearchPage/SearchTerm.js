import { styled } from 'linaria/react';
import { theme } from '../Theme';
const SearchTerm = styled('span')`
  display: block;
  text-align: center;
  margin-top: 0.5rem;
  color: ${theme.colors.black};
  font-size: 1.5rem;
`;

export default SearchTerm;
