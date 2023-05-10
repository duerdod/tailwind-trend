import useWarningInDev from '@jetshop/core/hooks/useWarningInDev';
import { getFullUrl } from './utils/getFullUrl';
import { getImageWidths } from './utils/getImageWidths';
import { getLargestSize } from './utils/getLargestSize';
import { getLQIP } from './utils/getLQIP';
import { getSizesMap } from './utils/getSizesMap';
import { getSrcSetFromWidths } from './utils/getSrcSetFromWidths';
import React from 'react';
import { ImageValue, ProductImageSize } from '@jetshop/core/types';

type ImageSrcType = string | ProductImageSize[] | ImageValue;
export type Gravity = 'north' | 'south' | 'west' | 'east' | 'centre' | 'smart';
export type ImageBreakpointSize = number | string;
export type ImageBreakpointSizes = ImageBreakpointSize | ImageBreakpointSize[];

interface ImageParameters {
  /** The image src
   * Also accepts an array of objects with `url` keys (deprecated image field)
   */
  src: ImageSrcType;
  /**
   * Whether to crop the image instead of resizing it when aspect ratio is provided
   * @default false
   */
  crop?: boolean;
  gravity?: Gravity;
  quality?: number;
  /** An array of image sizes, will be mapped against breakpoints.
   * @see https://docs.dev.jetshop.se/ui/image#the-sizes-prop
   */
  sizes: ImageBreakpointSizes;
  /**
   * The aspect ratio of the image
   * If unknown, use null to preserve original aspect ratio
   */
  aspect?: string;
  /* Is this image loading above the fold? If so, don't load the LQIP */
  critical?: boolean;
  modifiedDate?: string;
  breakpoints: Record<string, string>;
  baseUrl: string;
  focalPointX?: number;
  focalPointY?: number;
}

/**
 * Dynamically constructs the query parameters used by ImageMagick to size the image appropriately.
 * Also generates a LQIP using query parameters, to display while the full image loads.
 */
export function useConstructImage({
  gravity,
  crop,
  src,
  sizes,
  aspect,
  critical,
  quality,
  modifiedDate,
  breakpoints,
  baseUrl,
  focalPointX,
  focalPointY
}: ImageParameters) {
  // Warn if gravity was provided but crop was not
  useWarningInDev(
    gravity && !crop,
    'You have provided a gravity without setting crop to true. Your image will not be cropped, and the `gravity` prop will do nothing. Please remove the `gravity` prop.'
  );
  // Warn if the src is a falsy value
  useWarningInDev(
    !!!src,
    'You have provided a falsy value to the Image component. If you intentionally want to display a blank Image component, you may import `transparentDataImg` and use it for the src. Otherwise, this is probably a bug.'
  );

  /*
    For backwards-compatibility (and dev convenience) reasons, we accept a
    falsy `src` prop on Image. undefined | null will act just like the normal
    Image component does, except that it will show a transparent image where
    the image would normally load. This may be useful in cases where the end
    user is lazy and wants to do this:

    const { imageSrc } = someDataRequest();
    <Image src={imageSrc} />

    Where imageSrc may be undefined | null while the request is occurring. The
    preferred method is to be more explicit:

    const {imageSrc, loading} = someDataRequest();
    <Image src={loading ? transparentDataImg : imageSrc } />

    Therefore, whilst we will handle a null | undefined src, we will warn
    against its usage in dev.
  */
  let hasFalsySrc = true;
  let imageSrc = '';
  if (Array.isArray(src)) {
    // maintain support for deprecated image sizes array
    hasFalsySrc = false;
    imageSrc = getFullUrl(getLargestSize(src), baseUrl);
  }
  // When we have a string for the src
  if (!!src && typeof src === 'string') {
    hasFalsySrc = false;
    imageSrc = getFullUrl(src, baseUrl);
  }
  if (!!src && typeof src === 'object' && (src as ImageValue).value) {
    hasFalsySrc = false;
    imageSrc = getFullUrl((src as ImageValue).value, baseUrl);
  }
  // useMemo so this runs only if the image props change. It calculates the
  // strings used for `sizes`, `srcset`, and the `lqip`
  const { sizesMap, srcset, lqip, webpSrcset } = React.useMemo(() => {
    if (hasFalsySrc) {
      return {};
    }
    const widths = getImageWidths(Object.values(breakpoints), sizes);
    const srcSetFromWidths = ({ webp }: { webp: boolean }) =>
      getSrcSetFromWidths(
        imageSrc,
        widths,
        aspect,
        {
          crop,
          gravity,
          quality,
          webp,
          focalPointX,
          focalPointY
        },
        modifiedDate
      );

    const srcset = srcSetFromWidths({ webp: false });
    const webpSrcset = srcSetFromWidths({ webp: true });

    // If this is a critical image, don't calculate LQIP
    const lqip = critical
      ? null
      : getLQIP(imageSrc, widths, aspect, crop, modifiedDate);

    const sizesMap = getSizesMap(Object.values(breakpoints), sizes);
    return { sizesMap, srcset, lqip, webpSrcset };
  }, [
    aspect,
    breakpoints,
    crop,
    gravity,
    hasFalsySrc,
    imageSrc,
    quality,
    sizes,
    critical,
    modifiedDate,
    focalPointX,
    focalPointY
  ]);
  return {
    srcset,
    webpSrcset,
    sizes: sizesMap,
    lqip,
    src: imageSrc,
    hasFalsySrc
  };
}
