import { useInitialBreakpoint } from '@jetshop/core/components/BreakpointProvider';
import { useShopConfig } from '@jetshop/core/hooks/useShopConfig';
import React from 'react';
import Media from 'react-media';
import { getMaxBreakpointValue } from './breakpointsHelper';

// Above
// @media (min-width: 576px)
// <Above breakpoint="sm" />

// Below
// @media (max-width: 575.98px)
// <Below breakpoint="sm" />

// Between
// @media (min-width: 768px) and (max-width: 1199.98px)
// <Between breakpoints={["sm", "lg"]} />

export type BreakpointHelperProps = {
  breakpoint: string;
  render?: (props: any) => React.ReactNode;
  children?: (props: any) => React.ReactNode;
};

export type BreakpointBetweenProps = BreakpointHelperProps & {
  breakpoints: string[];
};

export const Above = ({
  breakpoint,
  render,
  children
}: BreakpointHelperProps) => {
  const {
    theme: { breakpoints }
  } = useShopConfig();

  const { breakpointIndex } = useInitialBreakpoint();

  const query = { minWidth: breakpoints[breakpoint] };

  return (
    <Media
      query={query}
      defaultMatches={
        Object.keys(breakpoints).indexOf(breakpoint) <= breakpointIndex
      }
    >
      {children || render}
    </Media>
  );
};

export function Below({ breakpoint, render, children }: BreakpointHelperProps) {
  const {
    theme: { breakpoints }
  } = useShopConfig();
  const { breakpointIndex } = useInitialBreakpoint();
  const bpMap = Object.entries(breakpoints).map(([key, val]) => {
    return { label: key, size: val };
  });

  const query = { maxWidth: getMaxBreakpointValue(breakpoint, bpMap) };

  return (
    <Media
      query={query}
      defaultMatches={
        Object.keys(breakpoints).indexOf(breakpoint) > breakpointIndex
      }
    >
      {children || render}
    </Media>
  );
}

export function Between({
  children,
  render,
  breakpoints
}: BreakpointBetweenProps) {
  const {
    theme: { breakpoints: configuredBreakpoints }
  } = useShopConfig();
  const { breakpointIndex } = useInitialBreakpoint();

  const bpMap = Object.entries(configuredBreakpoints).map(([key, val]) => {
    return { label: key, size: val };
  });
  const labels = Object.keys(configuredBreakpoints);
  const defaultMatches =
    labels.indexOf(breakpoints[0]) <= breakpointIndex &&
    labels.indexOf(breakpoints[1]) >= breakpointIndex;

  const query = {
    minWidth: configuredBreakpoints[breakpoints[0]],
    maxWidth: getMaxBreakpointValue(breakpoints[1], bpMap)
  };

  return (
    <Media query={query} defaultMatches={defaultMatches}>
      {children || render}
    </Media>
  );
}
