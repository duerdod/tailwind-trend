import { AspectRatio, Gravity } from '../Image';
import { getSrcWithParams } from './getSrcWithParams';

export interface ImageParamOptions {
  crop: boolean;
  gravity?: Gravity;
  quality?: number;
  webp?: boolean;
  focalPointX?: number;
  focalPointY?: number;
}

export const getSrcSetFromWidths = (
  src: string,
  widths: number[],
  aspect: AspectRatio,
  options: ImageParamOptions = { crop: false, webp: false },
  timestamp?: string
) => {
  const l = [];

  for (const w of widths) {
    l.push(getSrcWithParams(w, aspect, src, true, options, timestamp));
  }

  return l.join(', ');
};
