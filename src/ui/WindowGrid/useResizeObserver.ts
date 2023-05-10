import useResizeObserverClient from 'use-resize-observer';
import { useRef } from 'react';

function useResizeObserverServer<T>() {
  const ref = useRef<T>();
  return {
    width: 0,
    height: 0,
    ref
  };
}

export default __IN_SERVER__
  ? useResizeObserverServer
  : useResizeObserverClient;
