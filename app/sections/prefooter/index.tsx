"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

const socialLinks = [
  { name: "Book a Demo", href: "https://cal.com/bhavishramaswamy/30min" },
  { name: "Twitter", href: "https://twitter.com/0xhealthpay" },
  { name: "Medium", href: "https://healthpay.medium.com/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/0xhealthpay" },
];

const PreFooter = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress with better offset points
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Create smooth spring physics for curtain animations - slower timing for more visibility
  const rawCurtainY = useTransform(scrollYProgress, [0, 0.6, 0.9, 1], ["0vh", "0vh", "-50vh", "-100vh"]);
  const curtainY = useSpring(rawCurtainY, { stiffness: 100, damping: 30, mass: 0.8 });
  
  const rawCurtainOpacity = useTransform(scrollYProgress, [0, 0.6, 0.85, 1], [1, 1, 0.5, 0]);
  const curtainOpacity = useSpring(rawCurtainOpacity, { stiffness: 100, damping: 30 });
  
  // Parallax for curtain content (slower movement) - keep content visible longer
  const rawContentY = useTransform(scrollYProgress, [0, 0.6, 1], ["0px", "0px", "-60px"]);
  const contentY = useSpring(rawContentY, { stiffness: 80, damping: 25 });
  
  const rawContentOpacity = useTransform(scrollYProgress, [0, 0.6, 0.85, 1], [1, 1, 0.6, 0]);
  const contentOpacity = useSpring(rawContentOpacity, { stiffness: 100, damping: 30 });

  // Footer reveal with smooth spring - fixed at bottom, only opacity changes
  const rawFooterOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0, 0, 0.8, 1]);
  const footerOpacity = useSpring(rawFooterOpacity, { stiffness: 120, damping: 25 });
  
  // Scale effect for footer elements - subtle scale for depth
  const rawFooterScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 0.98, 1]);
  const footerScale = useSpring(rawFooterScale, { stiffness: 100, damping: 30 });
  
  // Pre-calculate transforms for animated background elements
  const purpleCircleX = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const purpleCircleRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const indigoCircleX = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const indigoCircleRotate = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const orangeCircleScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  
  // Pre-calculate transforms for footer content
  const brandNameY = useTransform(scrollYProgress, [0.3, 1], [20, 0]);
  const brandNameOpacity = useTransform(scrollYProgress, [0.3, 0.7, 1], [0, 0.8, 1]);
  const socialLinksY = useTransform(scrollYProgress, [0.4, 1], [30, 0]);
  const socialLinksOpacity = useTransform(scrollYProgress, [0.4, 0.8, 1], [0, 0.7, 1]);
  const contactY = useTransform(scrollYProgress, [0.6, 1], [40, 0]);
  const contactOpacity = useTransform(scrollYProgress, [0.6, 0.9, 1], [0, 0.8, 1]);
  
  // Pre-calculate transforms for individual social links
  const socialLinkY = useTransform(scrollYProgress, [0.5, 1], [20, 0]);
  const socialLink0Opacity = useTransform(scrollYProgress, [0.5, 0.8, 1], [0, 0.8, 1]);
  const socialLink1Opacity = useTransform(scrollYProgress, [0.55, 0.85, 1], [0, 0.8, 1]);
  const socialLink2Opacity = useTransform(scrollYProgress, [0.6, 0.9, 1], [0, 0.8, 1]);
  const socialLink3Opacity = useTransform(scrollYProgress, [0.65, 0.95, 1], [0, 0.8, 1]);
  
  const socialLinkTransforms = [
    { y: socialLinkY, opacity: socialLink0Opacity },
    { y: socialLinkY, opacity: socialLink1Opacity },
    { y: socialLinkY, opacity: socialLink2Opacity },
    { y: socialLinkY, opacity: socialLink3Opacity },
  ];

  return (
    <div ref={containerRef} className="relative h-[102vh]">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Footer Content - Fixed at bottom behind the curtain */}
        <motion.section
          style={{
            opacity: footerOpacity,
            scale: footerScale,
          }}
          className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-end justify-center pb-20"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div 
              className="absolute rounded-full blur-3xl bg-purple-600/8" 
              style={{
                top: "-30%",
                left: "-20%",
                width: "60%",
                height: "60%",
                x: purpleCircleX,
                rotate: purpleCircleRotate,
              }}
            />
            <motion.div 
              className="absolute rounded-full blur-3xl bg-indigo-600/8" 
              style={{
                bottom: "-30%",
                right: "-20%",
                width: "60%",
                height: "60%",
                x: indigoCircleX,
                rotate: indigoCircleRotate,
              }}
            />
            <motion.div 
              className="absolute rounded-full blur-2xl bg-orange-400/5" 
              style={{
                top: "50%",
                left: "50%",
                width: "40%",
                height: "40%",
                x: "-50%",
                y: "-50%",
                scale: orangeCircleScale,
              }}
            />
          </div>
          
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center gap-8 sm:gap-12 relative z-10 px-4 sm:px-6">
            {/* Brand Name with stagger animation */}
            <motion.h2 
              className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 font-bricolage text-transparent bg-clip-text text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-center"
              style={{
                y: brandNameY,
                opacity: brandNameOpacity,
              }}
            >
              Let&apos;s Health<span className="font-bold">Pay</span>
            </motion.h2>
            
            {/* Social Links with stagger */}
            <motion.div 
              className="flex flex-wrap justify-center gap-4 sm:gap-6"
              style={{
                y: socialLinksY,
                opacity: socialLinksOpacity,
              }}
            >
              {socialLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  style={{
                    y: socialLinkTransforms[index].y,
                    opacity: socialLinkTransforms[index].opacity,
                  }}
                >
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative focus:outline-none focus:ring focus:ring-offset-2 focus:ring-orange-500"
                  >
                    <span className="flex items-center gap-2 text-base sm:text-lg text-gray-700 hover:text-gray-900 transition duration-300">
                      {link.name}
                      <MdArrowOutward className="group-hover:rotate-45 transition-transform duration-300" />
                    </span>
                    <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-gradient-to-r from-orange-400 to-orange-600 group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Contact Section */}
            <motion.div 
              className="w-full border-t border-gray-200 pt-4 sm:pt-6"
              style={{
                y: contactY,
                opacity: contactOpacity,
              }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 text-sm sm:text-base text-gray-600">
                <p className="text-center sm:text-left">&copy; 2024 HealthPay. All rights reserved.</p>
                <a
                  href="mailto:hello@letshealthpay.com"
                  className="text-gray-700 hover:text-gray-900 transition-colors duration-300 flex items-center gap-2 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-orange-500"
                >
                  hello@letshealthpay.com
                  <MdArrowOutward className="inline-block" />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Black Curtain - Slides up to reveal footer */}
        <motion.section
          style={{ 
            y: curtainY,
            opacity: curtainOpacity,
          }}
          className="absolute inset-0 bg-black flex items-start justify-center z-10"
        >
          {/* Curtain Content */}
          <motion.div 
            style={{ 
              y: contentY,
              opacity: contentOpacity,
              // scale removed per your instructions (optional)
            }}
            className="relative z-10 w-full max-w-4xl"
          >
            {/* Text container */}
            <div 
              className="
                flex 
                items-start 
                justify-center 
                px-4
                sm:px-6 
                md:px-0
                h-full 
                py-8 sm:py-12 md:py-16
              "
            >
              <h3 
                className="
                  text-white 
                  font-medium 
                  tracking-tight
                  leading-tight
                  max-w-4xl
                  text-left
                  w-full

                  text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] xl:text-[72px]                  

                  // Ensure top-most alignment with padding
                  // The parent div adds padding-y, so the text is pushed slightly from top edge
                "
              >
                Plan the present.<br />
                Build the future.
              </h3>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default PreFooter;
