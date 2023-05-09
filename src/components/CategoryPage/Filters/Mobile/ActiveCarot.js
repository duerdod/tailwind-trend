import { ReactComponent as Carot } from '@jetshop/ui/svg/Carrot.svg';
import { ReactComponent as Check } from '@jetshop/ui/svg/Check.svg';
import { css, cx } from 'linaria';
import React from 'react';

const carot = css`
  transition: transform 200ms;
  transform: rotate(-90deg);
  &.is-open {
    transform: rotate(0);
  }
`;

export function ActiveCarot({ isActive, isOpen }) {
  return isActive ? (
    <Check className="check" />
  ) : (
    <Carot className={cx(carot, isOpen ? 'is-open' : null)} />
  );
}
