import { ProductImageSize } from '@jetshop/core/types';

/**
 * This exists to handle the deprecated `ProductImageSize` field from the API
 * Takes an array of sizes, and returns the url of the largest one
 * @param sizes Sizes field returned from API
 */
export const getLargestSize = (sizes: string | ProductImageSize[]) => {
  if (Array.isArray(sizes)) {
    if (sizes.length === 0) {
      throw new Error('Sizes must not be an empty array');
    }
    return sizes[sizes.length - 1].url;
  } else {
    return sizes.toString();
  }
};
