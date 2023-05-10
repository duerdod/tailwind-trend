import { getSizeForBreakpoint } from './getSizeForBreakpoint';
import { BreakpointValues, ImageBreakpointSizes } from '../Image';

export const getSizesMap = (
  breakpoints: BreakpointValues,
  sizes: ImageBreakpointSizes
) =>
  breakpoints
    .map((breakpoint, i) => {
      const size = getSizeForBreakpoint(sizes, i);
      let width;
      if (size > 2) {
        // Size is absolute value in px
        width = size + 'px';
      } else {
        // Size is already a fraction (or unset). Convert it to vw (percentage
        // of viewport width)
        width = Math.round(100 * (size || 1)) + 'vw';
      }
      // Include a media query for all but the last size
      if (i + 1 < breakpoints.length) {
        return `(max-width: ${breakpoint}) ${width}`;
      }
      return width;
    })
    .join(', ');
