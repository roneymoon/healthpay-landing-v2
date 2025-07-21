import { useEffect, useCallback, useRef } from "react";
import { useAnimate, usePresence, AnimationControls } from "framer-motion";

export default function useDropdownAnimation(
  hoveredItem: string | null,
  activeDropdown: React.ReactNode | null
) {
  const [scope, animate] = useAnimate();
  const [isPresent, safeToRemove] = usePresence();
  const animationControls = useRef<AnimationControls>();

  const animateDropdown = useCallback(async () => {
    try {
      // Stop any ongoing animation
      if (animationControls.current) {
        animationControls.current.stop();
      }

      const controls = {
        ...(hoveredItem && activeDropdown ? {
          width: "100%",
          borderRadius: "24px",
          height: "400px",
        } : {
          width: "920px",
          borderRadius: "32px",
          height: "90px",
        }),
        transition: {
          duration: 0.2,
          ease: "easeInOut",
          willChange: "width, border-radius, height"
        }
      };

      animationControls.current = animate(scope.current, controls) as unknown as AnimationControls;
    } catch (error) {
      // Animation error handling
      console.error("Animation error:", error);
    }
  }, [hoveredItem, activeDropdown, animate, scope]);

  useEffect(() => {
    if (!isPresent) {
      // Cleanup animations when component is removed
      if (animationControls.current) {
        animationControls.current.stop();
      }
      safeToRemove?.();
    } else {
      animateDropdown();
    }

    return () => {
      // Cleanup on unmount or when dependencies change
      if (animationControls.current) {
        animationControls.current.stop();
      }
    };
  }, [animateDropdown, isPresent, safeToRemove]);

  return scope;
} 