import { RefObject, useEffect, useState } from "react";

interface ScrollState {
  mobileSidebarOpen: boolean;
  navOpen: boolean;
}

interface ScrollActions {
  showNav: () => void;
  hideNav: () => void;
  showSidebar: () => void;
  hideSidebar: () => void;
}

export default function useScrollAnimation(
  containerRef: RefObject<HTMLDivElement>,
  shadowContainerRef: RefObject<HTMLDivElement>
) {
  const [state, setState] = useState<ScrollState>({
    mobileSidebarOpen: false,
    navOpen: false,
  });

  const actions: ScrollActions = {
    showNav: () => {
      setState((prev) => ({ ...prev, navOpen: true }));
    },
    hideNav: () => {
      setState((prev) => ({ ...prev, navOpen: false }));
    },
    showSidebar: () => {
      setState((prev) => ({ ...prev, mobileSidebarOpen: !prev.mobileSidebarOpen }));
    },
    hideSidebar: () => {
      setState((prev) => ({ ...prev, mobileSidebarOpen: false }));
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !shadowContainerRef.current) return;

      const scrollY = window.scrollY;
      const threshold = 100;

      if (scrollY > threshold) {
        containerRef.current.style.top = "0";
        shadowContainerRef.current.style.opacity = "1";
      } else {
        containerRef.current.style.top = "39px";
        shadowContainerRef.current.style.opacity = "0.8";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [containerRef, shadowContainerRef]);

  return { state, actions };
} 