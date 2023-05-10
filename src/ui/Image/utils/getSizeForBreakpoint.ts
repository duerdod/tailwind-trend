import { sizeToNumber } from './sizeToNumber';
import { ImageBreakpointSizes } from '../Image';
export const getSizeForBreakpoint = (
  sizes: ImageBreakpointSizes,
  offset: number
) => {
  if (Array.isArray(sizes)) {
    do {
      if (sizes[offset]) {
        return sizeToNumber(sizes[offset]);
      }
      offset--;
    } while (offset >= 0);
  } else {
    return sizeToNumber(sizes);
  }
  return 1;
};
