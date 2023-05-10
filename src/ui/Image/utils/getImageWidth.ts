import { sizeToNumber } from './sizeToNumber';
export const getImageWidth = (
  size: number | string = 1,
  vw: number,
  pixelRatio: number
) => {
  // Convert input size to fraction or px value
  size = sizeToNumber(size);
  // Size is in px
  if (size > 2) {
    return Math.round(size * pixelRatio);
  }
  // Size is a fraction
  return Math.round(vw * size * pixelRatio);
};
