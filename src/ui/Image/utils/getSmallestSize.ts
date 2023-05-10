import { ImageSrcType } from '../Image';
export const getSmallestSize = (sizes: ImageSrcType) => {
  if (Array.isArray(sizes)) {
    if (sizes.length === 0) {
      throw new Error('Sizes must not be an empty array');
    }
    return sizes[0].url;
  } else {
    return sizes.toString();
  }
};
