import { getImageWidth } from './getImageWidth';
import { remToPx } from './remToPx';
import { getSizeForBreakpoint } from './getSizeForBreakpoint';
import { BreakpointValues, ImageBreakpointSizes } from '../Image';
export const getImageWidths = (
  breakpoints: BreakpointValues,
  sizes: ImageBreakpointSizes
) => {
  const all = new Set<number>();

  for (let i = 0; i < breakpoints.length; i++) {
    const bpSize = getSizeForBreakpoint(sizes, i);
    const px = remToPx(breakpoints[i]);

    all.add(getImageWidth(bpSize, px, 1));
    all.add(getImageWidth(bpSize, px, 2));
  }

  return Array.from(all).sort();
};
