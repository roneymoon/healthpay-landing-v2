import { useState, useEffect, useCallback, useRef } from 'react';

interface ScrollState {
  isScrollingUp: boolean;
  isAtTop: boolean;
  lastScrollY: number;
  isCompact: boolean;
  isExpanded: boolean;
}

export const useScrollDirection = () => {
  const [state, setState] = useState<ScrollState>({
    isScrollingUp: false,
    isAtTop: true,
    lastScrollY: 0,
    isCompact: false,
    isExpanded: false,
  });

  // Use refs for values that we need in event listeners to avoid stale closures
  const stateRef = useRef(state);
  stateRef.current = state;

  // Throttle scroll updates
  const throttleTimeout = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    if (throttleTimeout.current !== null) return;

    throttleTimeout.current = window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const prevState = stateRef.current;
      
      const isScrollingUp = currentScrollY < prevState.lastScrollY;
      const isAtTop = currentScrollY < 10;
      const shouldUpdate = 
        prevState.isScrollingUp !== isScrollingUp ||
        prevState.isAtTop !== isAtTop ||
        prevState.lastScrollY !== currentScrollY ||
        prevState.isCompact !== (!isAtTop && !isScrollingUp && !prevState.isExpanded);

      if (shouldUpdate) {
        setState({
          ...prevState,
          isScrollingUp,
          isAtTop,
          lastScrollY: currentScrollY,
          isCompact: !isAtTop && !isScrollingUp && !prevState.isExpanded,
        });
      }

      throttleTimeout.current = null;
    });
  }, []);

  useEffect(() => {
    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (throttleTimeout.current !== null) {
        window.cancelAnimationFrame(throttleTimeout.current);
      }
    };
  }, [handleScroll]);

  const toggleExpanded = useCallback((expanded: boolean) => {
    setState(prev => ({
      ...prev,
      isExpanded: expanded,
      isCompact: !expanded,
    }));
  }, []);

  return {
    ...state,
    toggleExpanded,
  };
}; 