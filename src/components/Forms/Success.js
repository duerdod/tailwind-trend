import { css, cx } from 'linaria';
import React from 'react';

export function Success({ children, className }) {
  return (
    <div className={cx(success, className)}>
      <div data-testid="success-message">{children}</div>
    </div>
  );
}

const success = css`
  padding: 0.75em;
  color: #6d7d6a;
  background: #eff8ed;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  line-height: 1.5;

  aside {
    margin-left: auto;
  }

  svg {
    height: 20px;
    width: 20px;
  }
`;
