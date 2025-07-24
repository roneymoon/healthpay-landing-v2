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
  const expandTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const forceCompactTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = useCallback(() => {
    if (throttleTimeout.current !== null) return;

    throttleTimeout.current = window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const prevState = stateRef.current;
      
      const isScrollingUp = currentScrollY < prevState.lastScrollY;
      const isAtTop = currentScrollY < 10;

      // Clear any pending timeouts
      if (expandTimeoutRef.current) {
        clearTimeout(expandTimeoutRef.current);
        expandTimeoutRef.current = null;
      }

      if (forceCompactTimeoutRef.current) {
        clearTimeout(forceCompactTimeoutRef.current);
        forceCompactTimeoutRef.current = null;
      }

      // Force compact mode when scrolling down and not at top
      const shouldForceCompact = !isAtTop && !isScrollingUp && currentScrollY > 100;
      
      if (shouldForceCompact && !prevState.isCompact) {
        setState(prev => ({
          ...prev,
          isScrollingUp,
          isAtTop,
          lastScrollY: currentScrollY,
          isCompact: true,
          isExpanded: false
        }));
      } else {
        // Normal scroll behavior
        const newIsCompact = !isAtTop && !isScrollingUp;
        
        setState(prev => ({
          ...prev,
          isScrollingUp,
          isAtTop,
          lastScrollY: currentScrollY,
          isCompact: prev.isExpanded ? false : newIsCompact,
        }));
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
      if (expandTimeoutRef.current !== null) {
        clearTimeout(expandTimeoutRef.current);
      }
      if (forceCompactTimeoutRef.current !== null) {
        clearTimeout(forceCompactTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  const toggleExpanded = useCallback((expanded: boolean) => {
    // Clear any pending timeouts
    if (expandTimeoutRef.current) {
      clearTimeout(expandTimeoutRef.current);
      expandTimeoutRef.current = null;
    }
    if (forceCompactTimeoutRef.current) {
      clearTimeout(forceCompactTimeoutRef.current);
      forceCompactTimeoutRef.current = null;
    }

    setState(prev => ({
      ...prev,
      isExpanded: expanded,
      isCompact: !expanded,
    }));

    // Set a timeout to force compact mode after expanding
    if (!expanded) {
      forceCompactTimeoutRef.current = setTimeout(() => {
        const currentScrollY = window.scrollY;
        setState(prev => ({
          ...prev,
          isCompact: !prev.isAtTop && currentScrollY > 10,
          isExpanded: false
        }));
      }, 300);
    }
  }, []);

  return {
    ...state,
    toggleExpanded,
  };
}; 