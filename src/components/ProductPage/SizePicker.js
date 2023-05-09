import React from 'react';
import { SizeSelector } from '@jetshop/ui/Select';
import { styled } from 'linaria/react';

const StyledSizePicker = styled(SizeSelector)`
  margin-left: -1.25rem;
  max-width: 20rem;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: 16px;
  button {
    border: none;
    padding: 0;
    line-height: 36px;
    font-size: 16px;
    outline: none;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    display: flex;
    flex-wrap: wrap;
    margin: 0.5rem 1rem;
    align-items: center;
    justify-content: center;
    ${({ active }) =>
      active
        ? `border: .75px solid black;`
        : `border: .75px solid transparent;`};
    :focus {
      div {
        border: 1px solid black;
        border-radius: 50%;
      }
    }
  }
`;

const SizePicker = props => <StyledSizePicker maxButtons={8} {...props} />;

export default SizePicker;
