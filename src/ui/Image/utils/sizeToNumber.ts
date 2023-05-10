import { ImageBreakpointSize } from '../Image';
import { remToPx } from './remToPx';
const sizeRegexp = new RegExp(/(\d+)\s?(\w+)?/g);
export const sizeToNumber = (size: ImageBreakpointSize) => {
  if (typeof size === 'string') {
    try {
      sizeRegexp.lastIndex = 0;
      const matches = sizeRegexp.exec(size.toLowerCase().trim());
      const num = matches && matches[1];
      const unit = matches && matches[2];
      if ((!unit || unit === 'px') && num) {
        return +num;
      } else if (unit === 'rem') {
        return remToPx(num);
      } else {
        throw Error('Unknown unit ' + unit);
      }
    } catch (e) {
      console.error('Responsive Image: Unit conversion failed for', size, e);
      return 1;
    }
  }
  return size;
};
