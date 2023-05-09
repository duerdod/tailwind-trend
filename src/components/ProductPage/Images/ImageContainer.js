import Gallery from '@jetshop/ui/Gallery/Gallery';
import Badges from '@jetshop/ui/ProductList/Badges';
import React from 'react';
import { css, cx } from 'linaria';
import { useSwitchToVariantImage } from '@jetshop/core/hooks/Product';

const wrapper = css`
  display: flex;
  flex-direction: column;
  .image-gallery-thumbnails-container {
    display: flex;
  }
  .image-gallery-thumbnail {
    &.active {
      border: 1px solid black;
    }
  }
`;

export default function ImageContainer({ images, badges, variant, ...rest }) {
  const galleryRef = React.createRef();
  // Enable switching gallery to image of selected variant
  useSwitchToVariantImage({
    galleryImages: images,
    galleryRef,
    variant
  });

  const selectedVariantImageIndex = variant
    ? images.findIndex(image => image.url === variant.images?.[0]?.url)
    : null;

  return (
    <div {...rest} className={cx(rest.className, wrapper)}>
      <Gallery
        aspect={'1:1'}
        images={images}
        galleryRef={galleryRef}
        eagerlyLoad={
          selectedVariantImageIndex ? [0, selectedVariantImageIndex] : [0]
        }
      >
        <Badges badges={badges} />
      </Gallery>
    </div>
  );
}
