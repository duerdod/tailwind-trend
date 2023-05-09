import { styled } from 'linaria/react';
import { ReactComponent as SpinnerSvg } from '../../svg/Spinner.svg';

const Spinner = styled(SpinnerSvg)`
  animation: rotator 1.4s linear infinite;

  @keyframes rotator {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(270deg);
    }
  }

  .path {
    stroke-dasharray: 187;
    stroke-dashoffset: 0;
    transform-origin: center;
    stroke: currentColor;
    stroke-width: 6;
    stroke-linecap: round;
    animation: dash 1.4s ease-in-out infinite;
  }
  @keyframes dash {
    0% {
      stroke-dashoffset: 187;
    }
    50% {
      stroke-dashoffset: 46.75;
      transform: rotate(135deg);
    }
    100% {
      stroke-dashoffset: 187;
      transform: rotate(450deg);
    }
  }
`;

export default Spinner;
