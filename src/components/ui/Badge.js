import React from 'react';
import { styled } from 'linaria/react';
import { theme } from '../Theme';

const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 0.9rem;
  width: 0.9rem;
  border: 0;
  border-radius: 50%;
  line-height: 0.9rem;
  background-color: ${theme.colors.blue};
  overflow: hidden;

  span {
    height: 0.9rem;
    width: 0.9rem;
    border: 0;
    border-radius: 50%;
    font-size: 0.5rem;
    line-height: 0.9rem;
    color: ${theme.colors.white};
    background-color: ${theme.colors.blue};
    overflow: hidden;
  }
`;

const Badge = ({ text }) => {
  return (
    <Wrapper className="badge">
      <div>{text}</div>
    </Wrapper>
  );
};

export default Badge;
