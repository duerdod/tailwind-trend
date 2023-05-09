import { css } from 'linaria';

export const filterName = css`
  display: flex;
  padding: 1em;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #dedede;
  :first-of-type {
    border-top: none;
  }
`;
