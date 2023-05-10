export type Breakpoint = {
  label: string;
  size: string;
};

const findBreakpoint = (label: string, breakpointMap: Breakpoint[]) =>
  breakpointMap.find((bp) => bp.label === label);

const getBreakpointValue = (
  label: string | Breakpoint,
  breakpointMap: Breakpoint[]
) =>
  typeof label === 'object'
    ? label.size
    : findBreakpoint(label, breakpointMap).size;

const getMaxBreakpointValue = (
  label: string | Breakpoint,
  breakpointMap: BreakpointMap<any, any>[]
) => {
  if (label === null) return;
  /**
   * We do this to prevent collions between breakpoints.
   * https://www.w3.org/TR/mediaqueries-4/#range-context
   */
  const breakpointValue = getBreakpointValue(label, breakpointMap).toString();
  const postfix = breakpointValue.match(/[a-zA-Z]+/) || '';
  const value = parseInt(breakpointValue.match(/[0-9]+/)[0], 10);

  return `${value - 0.01}${postfix}`;
};

function getNextBreakpoint(label: string, breakpointMap: Breakpoint[]) {
  const index = breakpointMap.indexOf(findBreakpoint(label, breakpointMap));
  return index !== breakpointMap.length - 1 ? breakpointMap[index + 1] : null;
}

export interface BreakpointModel {
  [key: string]: string;
}

export interface BreakpointMap<T extends BreakpointModel, K extends keyof T> {
  label: K;
  size: T[K];
}

function createBreakpointHelpers<T extends BreakpointModel, K extends keyof T>(
  breakpoints: T
) {
  const labels = Object.keys(breakpoints);

  const breakpointMap: BreakpointMap<T, K>[] = Object.values(
    breakpoints
  ).reduce((arr, size, index) => {
    return [
      ...arr,
      {
        label: labels[index],
        size: size
      }
    ];
  }, []);

  const above = breakpointMap.reduce((obj, bp) => {
    return {
      ...obj,
      [bp.label]: `@media (min-width: ${bp.size})`
    };
  }, {} as { [P in K]: string });

  // {
  // md: 'sdfsdfsd'
  // }

  const below = breakpointMap.reduce((obj, bp) => {
    return {
      ...obj,
      [bp.label]: `@media (max-width: ${getMaxBreakpointValue(
        bp.label as string,
        breakpointMap
      )})`
    };
  }, {} as { [P in K]: string });

  const between = breakpointMap.reduce((obj, bp, breakpointMapIndex) => {
    /**
     * Create an array of min - max labels for each breakpoint
     * (xs-md, xs-lg etc)
     */
    const breakpointLabels = labels
      .reduce((arr, label, breakpointLabelIndex) => {
        return [
          ...arr,
          bp.label === label
            ? null
            : breakpointMapIndex < breakpointLabelIndex
            ? {
                name: `${String(bp.label)}-${label}`,
                from: bp.label,
                to: label
              }
            : null
        ];
      }, [])
      .filter((bp) => bp !== null);

    /**
     * Create an array of CSS media queries from the breakpoint labels
     */
    const mediaQueries = breakpointLabels.reduce((obj, bpName) => {
      return {
        ...obj,
        [bpName.name]: `@media (min-width: ${bp.size}) and (max-width: ${
          breakpointMap.find((bp) => bp.label === bpName.to).size
        })`
      };
    }, {});

    return {
      ...obj,
      ...mediaQueries
    };
  }, {} as { [P in K]: string });

  const only = breakpointMap.reduce((obj, bp) => {
    const nextBreakpoint = getNextBreakpoint(
      bp.label as string,
      breakpointMap as any
    );
    const nextSize = nextBreakpoint
      ? getMaxBreakpointValue(
          nextBreakpoint.label,
          breakpointMap as Breakpoint[]
        )
      : null;
    return {
      ...obj,
      /**
       * Create min-max queries to target the specific size requested.
       * The last size in the array has no upper limit, so acts the same as
       * `from`
       */
      [bp.label]: nextSize
        ? `@media (min-width: ${bp.size}) and (max-width: ${nextSize})`
        : `@media (min-width: ${bp.size})`
    };
  }, {} as { [P in K]: string });

  return {
    breakpointMap,
    above,
    below,
    between,
    only
  };
}
export {
  findBreakpoint,
  getBreakpointValue,
  getMaxBreakpointValue,
  getNextBreakpoint,
  createBreakpointHelpers
};
