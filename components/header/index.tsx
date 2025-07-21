"use client";

import { useRef, useState, useCallback, memo, useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useScrollDirection } from "@/hooks/navbar/useScrollDirection";
import useDropdownAnimation from "@/hooks/navbar/useDropdownAnimation";
import { nav_links } from "@/data/nav_links";
import CompactNavbarButtons from "./CompactNavbarButtons";
import ExpandedNavbar from "./ExpandedNavbar";
import Wrapper from "./dropdown/Wrapper";
import Sidebar from "./Sidebar";

const containerVariants = {
  expanded: {
    height: "4rem",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.8
    }
  },
  compact: {
    height: "3rem",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.8
    }
  }
};

const backgroundVariants = {
  expanded: {
    opacity: 0.2,
    scale: 1,
    background: "linear-gradient(to right, rgba(255,255,255,0.2), rgba(255,255,255,0.2))",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.8
    }
  },
  compact: {
    opacity: 0,
    scale: 0.98,
    background: "transparent",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.8
    }
  }
};

const Header = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { isCompact, isExpanded, toggleExpanded } = useScrollDirection();
  const prefersReducedMotion = useReducedMotion();

  const activeDropdown = useMemo(() => 
    hoveredItem ? nav_links.find((item) => item.name === hoveredItem)?.dropdown_component : null,
    [hoveredItem]
  );

  const dropdownScope = useDropdownAnimation(hoveredItem, activeDropdown);

  const handleMouseEnter = useCallback((itemName: string) => {
    setHoveredItem(itemName);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredItem(null);
  }, []);

  // If user prefers reduced motion, use simpler animations
  const animationVariants = useMemo(() => 
    prefersReducedMotion ? {
      expanded: { height: "4rem" },
      compact: { height: "3rem" }
    } : containerVariants,
    [prefersReducedMotion]
  );

  const containerClassName = useMemo(() => {
    const baseClass = "relative flex items-center";
    const widthClass = isCompact && !isExpanded ? "w-[220px]" : "w-[65%]";
    const dropdownClass = hoveredItem && activeDropdown ? "!w-[65%]" : "";
    return `${baseClass} ${widthClass} ${dropdownClass}`.trim();
  }, [isCompact, isExpanded, hoveredItem, activeDropdown]);

  const containerStyle = useMemo(() => ({ 
    minHeight: isCompact ? "3rem" : "4rem",
    maxHeight: isCompact ? "3rem" : "4rem"
  }), [isCompact]);

  return (
    <motion.div
      ref={containerRef}
      className="w-full fixed top-6 left-0 flex items-center justify-center z-40"
      animate={isCompact ? "compact" : "expanded"}
      variants={animationVariants}
      initial={false}
      layout="position"
    >
      <motion.div
        className={containerClassName}
        onMouseLeave={handleMouseLeave}
        layout="position"
        ref={dropdownScope}
        style={containerStyle}
      >
        {/* Glassmorphic background */}
        <motion.div 
          className="absolute inset-0 backdrop-blur-[8px] rounded-full shadow-lg border border-white/10"
          layout="position"
          variants={backgroundVariants}
          style={{ willChange: "opacity, transform, background" }}
        />

        <AnimatePresence mode="wait" initial={false}>
          {isCompact && !isExpanded ? (
            <CompactNavbarButtons 
              key="compact"
              onExpandClick={() => toggleExpanded(true)} 
            />
          ) : (
            <ExpandedNavbar
              key="expanded"
              hoveredItem={hoveredItem}
              onHover={handleMouseEnter}
            />
          )}
        </AnimatePresence>

        {/* Dropdown and Mobile Menu */}
        <AnimatePresence mode="wait">
          {activeDropdown && (
            <motion.div 
              className="absolute left-0 right-0 top-[calc(100%+0.5rem)] mt-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ 
                duration: 0.2,
                ease: "easeInOut"
              }}
              style={{ willChange: "opacity, transform" }}
            >
              <Wrapper>{activeDropdown}</Wrapper>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// Prevent unnecessary re-renders
export default memo(Header);