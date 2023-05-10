import * as React from 'react';
import { useInView } from 'react-intersection-observer';
import { paddingForAspectRatio } from './utils/paddingForAspectRatio';
import { ProductImageSize } from '@jetshop/core/types';

export type ImageSrcType = string | ProductImageSize[];
export type BreakpointValues = string[];
export type ImageBreakpointSize = number | string;
export type ImageBreakpointSizes = ImageBreakpointSize | ImageBreakpointSize[];
export type AspectRatio = string | number;

export const transparentDataImg =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

export interface ImageParameters {
  src: string | boolean;
  sizes: string;

  hasFalsySrc: boolean;
  srcset: string;
  webpSrcset: string;
  lqip: string;
  /**
   * The aspect ratio of the image
   * If unknown, use null to preserve original aspect ratio
   */
  aspect?: string;
  /* Is this image loading above the fold? If so, don't load the LQIP */
  critical?: boolean;
}

export interface ImageProps extends ImageParameters {
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
  children?: React.ReactNode;
}

const defaultImageState = {
  imgLoaded: false,
  error: false
};
const loadedImageState = {
  imgLoaded: true,
  error: false
};

type ImageState = typeof defaultImageState;

let hydrated = false;
const imageCache = Object.create({});

function isInCache(src: string) {
  return src in imageCache;
}

function cacheImage(src: string) {
  imageCache[src] = true;
}

function imageStateReducer(
  _: ImageState,
  action: { type: 'loaded' | 'error' | 'reset'; cacheKey?: string }
) {
  switch (action.type) {
    case 'reset':
      return defaultImageState;
    case 'loaded':
      cacheImage(action.cacheKey);
      return loadedImageState;
    case 'error':
      return { imgLoaded: false, error: true };
    default:
      console.error(`Action ${action.type} is invalid for image reducer`);
      return;
  }
}

function useObjectFitPolyfill(imageRefs: React.RefObject<HTMLImageElement>[]) {
  const [polyfilled, setPolyfilled] = React.useState(false);

  React.useEffect(() => {
    const testImg = document.createElement(`img`);
    if (
      typeof testImg.style.objectFit === `undefined` ||
      typeof testImg.style.objectPosition === `undefined`
    ) {
      import(`object-fit-images`).then(({ default: ObjectFitImages }) => {
        imageRefs.forEach(imageRef => {
          imageRef.current && ObjectFitImages(imageRef.current);
        });
        setPolyfilled(true);
      });
    }
  }, [imageRefs]);

  return polyfilled;
}

function getTypeByExtension(src: string) {
  // Identifying type by extension, based on common image file types
  // https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
  const extensionRegex = /\.(jpg|jpeg|jfif|pjpeg|pjp|png|gif|bmp|webp|svg|apng|ico|cur)(?:\?.*)?$/i;
  const formatMatch = extensionRegex.exec(src);

  if (!formatMatch) return null;

  let type = null;

  switch (formatMatch[1]) {
    case 'jpg':
    case 'jpeg':
    case 'jfif':
    case 'pjpeg':
    case 'pjp':
      type = 'image/jpeg';
      break;
    case 'png':
      type = 'image/png';
      break;
    case 'gif':
      type = 'image/gif';
      break;
    case 'bmp':
      type = 'image/bmp';
      break;
    case 'webp':
      type = 'image/webp';
      break;
    case 'svg':
      type = 'image/svg+xml';
      break;
    case 'apng':
      type = 'image/apng';
      break;
    case 'ico':
    case 'cur':
      type = 'image/x-icon';
      break;
    default:
      break;
  }

  return type;
}

interface ExtendedImgProps {
  objectFit?: React.CSSProperties['objectFit'];
  critical: boolean;
}

const Img = React.forwardRef(
  (
    props: React.ImgHTMLAttributes<HTMLImageElement> & ExtendedImgProps,
    ref: React.Ref<HTMLImageElement>
  ) => {
    const {
      sizes,
      srcSet,
      src,
      style,
      alt,
      onLoad,
      onError,
      objectFit,
      critical,
      ...otherProps
    } = props;

    const imgStyle = {
      position: 'absolute' as React.CSSProperties['position'],
      top: 0,
      left: 0,
      width: `100%`,
      height: `100%`,
      paddingTop: 0,
      objectPosition: `center`,
      objectFit,
      ...style
    };

    return (
      <img
        alt={alt}
        sizes={sizes}
        srcSet={srcSet}
        src={src}
        onLoad={onLoad}
        onError={onError}
        loading={critical ? 'eager' : 'lazy'}
        {...otherProps}
        ref={ref}
        style={imgStyle}
      />
    );
  }
);

const Placeholder = React.forwardRef(
  (props: any, ref: React.Ref<HTMLImageElement>) => {
    return (
      <picture data-flight-image-placeholder="">
        <Img loading="lazy" alt="" {...props} ref={ref} />
      </picture>
    );
  }
);

const Image: React.FC<ImageProps> = function Image({
  src,
  hasFalsySrc,
  lqip,
  sizes,
  srcset,
  webpSrcset,
  critical,
  aspect,
  cover = false,
  alt = '',
  fillAvailableSpace = false,
  children,
  error: ErrorComp,
  className,
  badges,
  ...rest
}) {
  // Set up the IntersectionObserver
  const [ref, inView] = useInView({ triggerOnce: true });
  // Check if the browser supports loading="lazy". In that case, we don't need
  // the IntersectionObserver
  const nativeLazyLoading =
    typeof HTMLImageElement !== 'undefined' &&
    'loading' in HTMLImageElement.prototype;

  const imageRef = React.createRef<HTMLImageElement>();
  const placeholderRef = React.createRef<HTMLImageElement>();
  useObjectFitPolyfill([imageRef, placeholderRef]);

  const [{ imgLoaded, error }, dispatch] = React.useReducer(
    imageStateReducer,
    critical ? loadedImageState : defaultImageState
  );

  const cacheKey = srcset;

  const handleImgLoad = React.useCallback(
    function handleImgLoad() {
      dispatch({ type: 'loaded', cacheKey });
    },
    [cacheKey]
  );

  function handleImgError() {
    dispatch({ type: 'error' });
  }

  // Treat critical images as always cached
  const isCached = critical || isInCache(cacheKey);

  React.useEffect(() => {
    hydrated = true;
  }, []);

  React.useEffect(() => {
    dispatch({ type: 'reset' });
  }, [src]);

  React.useEffect(() => {
    // Handle case where image onLoad fires during SSR
    if (imageRef.current && imageRef.current.complete && !isCached) {
      handleImgLoad();
    }
  }, [handleImgLoad, imageRef, isCached]);

  // Render nothing if src is boolean
  if (typeof src === 'boolean' && !src) {
    return null;
  }

  const loaded = imgLoaded || hasFalsySrc || isCached;

  const objectFit = cover || fillAvailableSpace ? 'cover' : 'contain';
  const objectFitPolyfillStyles = { fontFamily: `"object-fit: ${objectFit}"` };

  const type = getTypeByExtension(src as string);

  return (
    <>
      <div
        key={src as string}
        ref={
          // If we have native lazyloading, by not applying the `ref` from
          // useInView we don't use IntersectionObserver at all
          nativeLazyLoading ? undefined : ref
        }
        data-flight-image-container=""
        data-flight-image-loaded={loaded}
        className={className}
        {...rest}
        style={{
          position: `relative`,
          overflow: `hidden`,
          width: `100%`,
          height: fillAvailableSpace ? '100%' : 'auto',
          paddingBottom: fillAvailableSpace
            ? 0
            : !aspect
            ? '100%'
            : paddingForAspectRatio(aspect)
        }}
      >
        {error ? (
          <ErrorComp />
        ) : (
          <>
            <Placeholder
              src={critical ? transparentDataImg : lqip || transparentDataImg}
              ref={placeholderRef}
              style={{
                objectFit,
                opacity: loaded ? 0 : 0.6,
                transitionDelay: `500ms`,
                ...objectFitPolyfillStyles
              }}
            />

            {(inView || nativeLazyLoading || !hydrated || isCached) && (
              <picture data-flight-image="">
                <source type="image/webp" srcSet={webpSrcset} sizes={sizes} />
                <source type={type} srcSet={srcset} sizes={sizes} />
                <Img
                  srcSet={srcset}
                  src={(src as string) || transparentDataImg}
                  sizes={sizes}
                  onLoad={handleImgLoad}
                  onError={handleImgError}
                  alt={alt}
                  ref={imageRef}
                  style={{
                    objectFit,
                    opacity: loaded ? 1 : 0,
                    transition: `opacity 500ms`,
                    ...objectFitPolyfillStyles
                  }}
                  critical={critical}
                />
              </picture>
            )}

            <noscript>
              <picture>
                <Img
                  srcSet={srcset}
                  src={src as string}
                  sizes={sizes}
                  alt={alt}
                  style={{
                    objectFit
                  }}
                  critical={critical}
                />
              </picture>
            </noscript>
          </>
        )}

        {children && (
          <div
            data-flight-image-children=""
            style={{
              position: 'relative',
              zIndex: 2,
              width: '100%',
              height: '100%'
            }}
          >
            {children}
          </div>
        )}
        {badges && (
          <div
            data-flight-image-badges=""
            style={{
              zIndex: 2
            }}
          >
            {badges}
          </div>
        )}
      </div>
    </>
  );
};

export default Image;
