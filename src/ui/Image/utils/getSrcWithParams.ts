import { aspectRatioToFraction } from './aspectRatioToFraction';
import { AspectRatio } from '../Image';
import { ImageParamOptions } from './getSrcSetFromWidths';

export function getSrcWithParams(
  width: number,
  aspect: AspectRatio,
  src: string,
  includeViewportSize = true,
  options: ImageParamOptions = { crop: false, webp: false },
  timestamp?: string
) {
  const resizeMethod = options.crop ? 'crop' : 'fit';
  const gravity = options.gravity;
  const quality = options.quality;
  const height = aspect
    ? Math.round(width * aspectRatioToFraction(aspect))
    : null;

  let qstring;
  if (height) {
    qstring = `?extend=copy&width=${width}&method=${resizeMethod}&height=${height}`;
    if (gravity) qstring += `&gravity=${gravity}`;
  } else {
    qstring = `?extend=copy&width=${width}&method=resize`;
  }
  if (quality) qstring += `&quality=${quality}`;
  if (options.webp) qstring += `&type=webp`;
  if (timestamp) qstring += `&timestamp=${timestamp}`;
  if (options.focalPointX && options.focalPointY) {
    qstring += `&im=RegionOfInterestCrop=(${width},${height}),style=crop,gravity=Center,regionOfInterest=(anchor=(x=${options.focalPointX},y=${options.focalPointY}),width=${width},height=${height})`;
  }

  return src + qstring + `${includeViewportSize ? ` ${width}w` : ''}`;
}
