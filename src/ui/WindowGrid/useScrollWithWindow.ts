import {
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
  RefObject
} from 'react';
import { FixedSizeList } from 'react-window';

interface ScrollWithWindow {
  container: RefObject<HTMLElement>;
  width: number;
  height: number;
}

function useScrollWithWindow({ container, width, height }: ScrollWithWindow) {
  const [offset, setOffset] = useState(0);
  const ref = useRef<FixedSizeList>();

  // Calculate offset from top of the page to the start of WindowGrid whenever
  // the container size is changed
  useLayoutEffect(() => {
    if (container.current) {
      const viewportTop = container.current.getBoundingClientRect().top;
      const scrollTop =
        'scrollY' in window
          ? window.scrollY
          : document.documentElement.scrollTop;

      const top = scrollTop + viewportTop;
      setOffset(top);
    }
  }, [container, width, height]);

  // Sync scrolling between window and react-window list
  const handleScroll = useCallback(() => {
    if (ref.current) {
      const scroll =
        'scrollY' in window
          ? window.scrollY
          : document.documentElement.scrollTop;

      ref.current.scrollTo(scroll - offset);
    }
  }, [ref, offset]);

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return {
    ref
  };
}

function useScrollWithWindowServer(_props: ScrollWithWindow) {
  const ref = useRef<FixedSizeList>();
  return { ref };
}

export default __IN_SERVER__ ? useScrollWithWindowServer : useScrollWithWindow;
