import React from 'react';
import { styled } from 'linaria/react';
import { ReactComponent as Cross } from '@jetshop/ui/svg/Cross.svg';

const SvgButtonWrapper = styled('button')`
  padding: 16px;
  margin: -16px;
  background: inherit;
  display: flex;
  svg {
    path {
      fill: black;
    }
  }
`;

const CloseButton = ({ onClick, className }) => (
  <SvgButtonWrapper
    onClick={onClick}
    className={className}
    aria-label="Close menu"
  >
    <Cross />
  </SvgButtonWrapper>
);

export default CloseButton;
