"use client";

import { useEffect, useRef } from "react";

interface GlowingEffectProps {
  spread?: number;
  glow?: boolean;
  disabled?: boolean;
  proximity?: number;
  inactiveZone?: number;
}

export function GlowingEffect({
  spread = 40,
  glow = true,
  disabled = false,
  proximity = 64,
  inactiveZone = 0.01,
}: GlowingEffectProps) {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled || !glow || !glowRef.current) return;

    const card = glowRef.current;
    const cardBounds = card.getBoundingClientRect();

    const handleMouseMove = (e: MouseEvent) => {
      if (!card) return;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const cardCenterX = cardBounds.left + cardBounds.width / 2;
      const cardCenterY = cardBounds.top + cardBounds.height / 2;

      const distanceX = mouseX - cardCenterX;
      const distanceY = mouseY - cardCenterY;

      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
      const maxDistance = Math.sqrt(
        (cardBounds.width / 2) ** 2 + (cardBounds.height / 2) ** 2
      );

      if (distance < maxDistance * (1 + inactiveZone)) {
        const angle = Math.atan2(distanceY, distanceX);
        const intensity = (maxDistance - distance) / maxDistance;

        const glowX = Math.cos(angle) * spread * intensity;
        const glowY = Math.sin(angle) * spread * intensity;

        card.style.background = `radial-gradient(
          ${proximity}px circle at 
          calc(50% + ${glowX}px) 
          calc(50% + ${glowY}px), 
          rgba(255, 255, 255, 0.1), 
          transparent 60%
        )`;
      } else {
        card.style.background = "transparent";
      }
    };

    const handleMouseLeave = () => {
      if (card) {
        card.style.background = "transparent";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (card) {
        card.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [disabled, glow, spread, proximity, inactiveZone]);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none absolute inset-0 transition-all duration-300"
      style={{
        borderRadius: "inherit",
      }}
    />
  );
}
