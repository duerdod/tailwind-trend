import { AspectRatio } from '../Image';
export const aspectRatioToFraction = (aspect: AspectRatio) => {
  if (typeof aspect === 'string' && aspect.indexOf(':') > 0) {
    const [a, b] = (aspect.split(':') as unknown) as number[];
    return b / a;
  } else if (typeof aspect === 'number') {
    return aspect;
  }
  throw new TypeError(
    'Aspect ratio is not a Number or String with the format n:m'
  );
};
