import { styled } from 'linaria/react';

const Divider = styled('hr')`
  height: 1px;
  border: none;
  border-bottom: 1px solid #bfbdbd;
  width: 100%;
  margin-top: ${({ mt }) => mt};
  margin-bottom: ${({ mb }) => mb};
`;
export default Divider;
