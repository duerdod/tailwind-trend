import { styled } from 'linaria/react';
import { css } from 'linaria';

const styles = `
  font-style: normal;
  font-weight: 600;
  line-height: 1.5rem;
  font-size: 1rem;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  font-variant: small-caps;
  margin-bottom: 0.75rem;
`;

export const smallCaps = css`
  ${styles};
`;
export const SmallCaps = styled('h1')`
  ${styles};
`;
