import React from 'react';
import { cx, css } from 'linaria';
import { ReactComponent as NoticeSVG } from '../../svg/notice.svg';

export function GlobalError({ children, className, style }) {
  return (
    <div
      style={style}
      className={cx(error, className)}
      data-testid="validation-error"
    >
      <div>{children}</div>
      <aside>
        <NoticeSVG />
      </aside>
    </div>
  );
}

const error = css`
  color: #e2a300;
  padding: 0.75em;
  background: #f7f5f2;
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
