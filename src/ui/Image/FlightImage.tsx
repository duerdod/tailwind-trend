import { useShopConfig } from '@jetshop/core/hooks/useShopConfig';
import Image from './BaseImage';
import React from 'react';
import t from '@jetshop/intl';
import { useConstructImage } from './useConstructImage';
import { ProductImageSize } from '@jetshop/core/types';
import ChannelContext from '@jetshop/core/components/ChannelContext';

export type ImageSrcType = string | ProductImageSize[];
export type BreakpointValues = string[];
export type ImageBreakpointSize = number | string;
export type ImageBreakpointSizes = ImageBreakpointSize | ImageBreakpointSize[];
export type AspectRatio = string | number;
export type Gravity = 'north' | 'south' | 'west' | 'east' | 'centre' | 'smart';

export const transparentDataImg =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

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
  focalPointX?: number;
  focalPointY?: number;
  children?: React.ReactNode;
}

interface ImageProps extends ImageParameters {
  /** Whether or not to use `background-size: cover` */
  cover?: boolean;
  error?: (args: any) => React.ReactElement<any>;
  alt?: string;
  title?: string;
  /**
   * Useful for banner images. Sets the following CSS automatically:
   * object-fit: cover
   * padding-top: 0;
   */
  fillAvailableSpace?: boolean;
  className?: string;
  badges?: React.ReactElement<any>;
}

function Error() {
  return (
    <div
      style={{
        background: '#e2e2e2',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: `absolute`,
        top: 0,
        left: 0,
        width: `100%`,
        height: `100%`
      }}
    >
      {t('Image Not Found')}
    </div>
  );
}

function FlightImage(props: ImageProps) {
  const {
    gravity,
    crop,
    src: originalSrc,
    sizes: sizesArray = [1],
    aspect,
    quality,
    critical,
    modifiedDate,
    error: ErrorComp = Error,
    focalPointX,
    focalPointY,
    ...rest
  } = props;

  const {
    theme: { breakpoints }
  } = useShopConfig();

  // The baseUrl will change based on the currently-selected channel.
  // We need it to correctly construct the image url
  const { selectedChannel } = React.useContext(ChannelContext);
  const baseUrl = selectedChannel?.imageUrl
    ? String(selectedChannel.imageUrl)
    : null;

  const {
    src,
    hasFalsySrc,
    lqip,
    sizes,
    srcset,
    webpSrcset
  } = useConstructImage({
    gravity,
    crop,
    src: originalSrc,
    sizes: sizesArray,
    aspect,
    quality,
    critical,
    modifiedDate,
    breakpoints,
    baseUrl,
    focalPointX,
    focalPointY
  });

  return (
    <Image
      {...rest}
      critical={critical}
      aspect={aspect}
      src={hasFalsySrc && typeof originalSrc === 'boolean' ? false : src}
      hasFalsySrc={hasFalsySrc}
      lqip={lqip}
      sizes={sizes}
      srcset={srcset}
      webpSrcset={webpSrcset}
      error={ErrorComp}
    />
  );
}

export default FlightImage;
