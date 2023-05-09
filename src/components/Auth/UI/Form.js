import { css } from 'linaria';
import { theme } from '../../Theme';

export const smallSection = css`
  display: flex;
  flex-direction: column;
  padding: ${theme.space[1]};
  width: 30rem;
  max-width: 100%;
  label {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }

  ${theme.below.sm} {
    width: 100%;
  }
`;

export const activeSegment = css`
  position: relative;
  ::before {
    content: '';
    position: absolute;
    left: -1.5rem;
    top: 0;
    bottom: 0;
    width: 3px;
    height: 100%;
    background: ${theme.colors.blue};
    transition: opacity 0.4s ease;
  }
`;
