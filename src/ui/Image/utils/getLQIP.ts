import { getSrcWithParams } from './getSrcWithParams';

/**
 * Generates a LQIP (Low Quality Image Placeholder) using the Flight image
 * handling API (via query params)
 * @param src The image src
 * @param widths An array of image widths
 * @param aspect The desired aspect ratio of the placeholder
 */
export function getLQIP(
  src: string,
  widths: number[],
  aspect: string,
  crop: boolean = false,
  modifiedDate: string
) {
  const transparent =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  if (!src) return transparent;

  // Use the smallest width for the placeholder, to ensure it is the smallest filesize possible
  const smallestWidth = widths.sort((a, b) => a - b)[0];

  const finalSrc = `${getSrcWithParams(smallestWidth, aspect, src, false, {
    crop
  })}&sigma=2.5&minampl=0.5&quality=30&type=auto${
    modifiedDate ? '&timestamp=' + modifiedDate : ''
  }`;

  return finalSrc;
}
