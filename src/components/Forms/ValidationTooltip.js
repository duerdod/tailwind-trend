import React from 'react';
import { css } from 'linaria';
import Tooltip from 'react-tooltip-lite';
import { Below } from '@jetshop/ui/Breakpoints';

const tipContentClassName = css`
  .react-tooltip-lite {
    color: #ffffff;
    background-color: #000000;
    font-size: 14px;
    padding: 0px 20px !important;
    display: flex !important;
    align-items: center;
    justify-content: center;
    height: 30px;
  }
  .react-tooltip-lite-right-arrow {
    margin-top: -5px;
  }
  .react-tooltip-lite-left-arrow {
    margin-top: -5px;
  }
  .react-tooltip-lite-down-arrow {
    margin-top: 5px;
  }
  .react-tooltip-lite-up-arrow {
    margin-top: -5px;
  }
`;
const ValidationTooltip = ({ direction = 'right', ...props }) => {
  return (
    <Below breakpoint="md">
      {matches => {
        const newDirection = matches ? 'bottom' : direction;
        return (
          <Tooltip
            arrowSize={15}
            distance={matches ? 10 : 20}
            useDefaultStyles={false}
            tipContentClassName={tipContentClassName}
            useHover={false}
            direction={newDirection}
            {...props}
          />
        );
      }}
    </Below>
  );
};

export default ValidationTooltip;
