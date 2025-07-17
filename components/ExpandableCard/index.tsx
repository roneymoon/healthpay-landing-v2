"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export function ExpandableCard() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    document.body.style.overflow = active && typeof active === "object" ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <div className="fixed inset-0 grid place-items-center z-[100] px-4 py-20">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="relative w-full max-w-[500px] md:h-fit md:max-h-[80vh] flex flex-col bg-white/10 backdrop-blur-xl dark:bg-neutral-900/90 rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
              style={{
                height: typeof window !== 'undefined' && window.innerWidth < 768 ? '60vh' : 'auto'
              }}
            >
              <motion.button
                key={`button-${active.title}-${id}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="absolute top-4 right-4 z-10 flex items-center justify-center bg-black/20 backdrop-blur-md rounded-full h-8 w-8 border border-white/20 hover:bg-black/30 transition-colors"
                onClick={() => setActive(null)}
              >
                <CloseIcon />
              </motion.button>

              <motion.div 
                layoutId={`image-${active.title}-${id}`}
                className="relative"
              >
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-40 sm:h-60 object-cover object-top rounded-t-3xl"
                />
              </motion.div>

              <div className="p-4 sm:p-6 flex flex-col overflow-y-auto">
                <div className="flex flex-col gap-2">
                  <motion.h3
                    layoutId={`title-${active.title}-${id}`}
                    className="font-medium text-gray-100 text-lg sm:text-xl"
                  >
                    {active.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${active.description}-${id}`}
                    className="text-gray-200/90 text-sm sm:text-base"
                  >
                    {active.description}
                  </motion.p>
                </div>
                <div className="mt-3 sm:mt-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="prose prose-gray prose-invert text-sm max-w-none [&>p]:text-gray-200/90 [&>p]:text-sm sm:[&>p]:text-base"
                  >
                    {typeof active.content === "function" ? active.content() : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="w-full px-4">
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {cards.map((card) => (
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              key={card.title}
              onClick={() => setActive(card)}
              className="group relative p-4 sm:p-5 flex flex-col bg-white/5 hover:bg-white/10 dark:bg-neutral-900/50 dark:hover:bg-neutral-800/60 backdrop-blur-xl rounded-3xl cursor-pointer border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(0,200,200,0.1)] overflow-hidden h-full"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <GlowingEffect 
                spread={60}
                glow={true}
                disabled={false}
                proximity={80}
                inactiveZone={0.02}
              />
              <div className="flex flex-col h-full relative z-10">
                <motion.div 
                  layoutId={`image-${card.title}-${id}`}
                  className="relative rounded-2xl overflow-hidden aspect-[4/3]"
                >
                  <img
                    width={100}
                    height={100}
                    src={card.src}
                    alt={card.title}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
                <div className="flex flex-col flex-grow gap-2 mt-4 sm:mt-5">
                  <motion.h3
                    layoutId={`title-${card.title}-${id}`}
                    className="font-medium text-gray-100 text-lg sm:text-xl"
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${card.description}-${id}`}
                    className="text-gray-200/90 text-sm sm:text-base"
                  >
                    {card.description}
                  </motion.p>
                </div>
                <motion.a
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-teal-900 dark:text-teal-200 bg-teal-100/80 dark:bg-teal-900/20 rounded-full hover:bg-teal-200/80 dark:hover:bg-teal-900/30 transition-colors duration-200 mt-4 sm:mt-5 relative z-10"
                  href={card.ctaLink}
                  onClick={(e) => e.stopPropagation()}
                >
                  {card.ctaText}
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

// HealthPay-specific cards data
const cards = [
    {
      title: "Instant Claim Processing",
      description: "Speedy settlements with real-time validation",
      src: "/fast-moving.avif",
      ctaText: "Learn More",
      ctaLink: "#",
      content: () => (
        <p>
          HealthPay automates claim validation using AI-powered rules engines and real-time verification APIs,
          enabling hospitals and insurers to process claims within minutes. Say goodbye to manual reviews,
          reduce fraud risk, and improve patient satisfaction with lightning-fast claim approvals.
        </p>
      ),
    },
    {
      title: "Unified Health Records",
      description: "Streamlined access to patient histories",
      src: "/perfection.avif",
      ctaText: "Explore",
      ctaLink: "#",
      content: () => (
        <p>
          Access and manage medical records, diagnostics, insurance data, and billing information
          in one secure dashboard. HealthPay integrates with hospital EMRs and insurer databases to
          create a 360° view of each patient, helping healthcare providers make faster, informed decisions.
        </p>
      ),
    },
    {
      title: "Smart Insurance Matching",
      description: "Best-fit policies for every patient",
      src: "/fast-moving.avif",
      ctaText: "View Options",
      ctaLink: "#",
      content: () => (
        <p>
          HealthPay uses intelligent matching algorithms to recommend suitable insurance policies based
          on a patient's history, preferences, and current treatments. This empowers agents and users to
          compare, enroll, and track insurance in a seamless, intuitive experience.
        </p>
      ),
    },
    {
      title: "Real-Time Analytics",
      description: "Monitor performance & spot inefficiencies",
      src: "/perfection.avif",
      ctaText: "See Dashboard",
      ctaLink: "#",
      content: () => (
        <p>
          Gain live insights into claim approval rates, settlement delays, fraud detection,
          and patient service satisfaction. HealthPay’s analytics dashboard is built for both
          healthcare managers and insurers to track KPIs and optimize workflows continuously.
        </p>
      ),
    },
  ];
  