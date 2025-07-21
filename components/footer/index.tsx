import { type FC } from 'react'
import Link from 'next/link'
import { MdArrowOutward } from 'react-icons/md'
import { footerSections } from '@/lib/constant'
import FooterSection from './footerSection'

const socialLinks = [
  { name: "Book a Demo", href: "https://cal.com/bhavishramaswamy/30min" },
  { name: "Twitter", href: "https://twitter.com/0xhealthpay" },
  { name: "Medium", href: "https://healthpay.medium.com/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/0xhealthpay" },
];

const DecorativeElements = () => (
  <>
    <div className="absolute -top-1/2 -left-1/4 w-1/2 h-1/2 rounded-full blur-3xl bg-blue-600/5" />
    <div className="absolute -bottom-1/2 -right-1/4 w-1/2 h-1/2 rounded-full blur-3xl bg-indigo-600/5" />
  </>
);

const SocialLinks = () => (
  <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
    {socialLinks.map((link) => (
      <Link
        key={link.name}
        href={link.href}
        className="group relative focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2 focus:ring-offset-black rounded"
      >
        <span className="flex items-center gap-2 text-base sm:text-lg text-gray-400 hover:text-white transition duration-300">
          {link.name}
          <MdArrowOutward className="group-hover:rotate-45 transition-transform duration-300" />
        </span>
        <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-gradient-to-r from-blue-500/50 to-indigo-600/50 group-hover:w-full transition-all duration-300" />
      </Link>
    ))}
  </div>
);

export default function Footer() {
  return (
    <footer className="relative w-full bg-black">
      <div className="relative w-full">
        <div className="w-full flex flex-col items-center justify-end py-12 sm:py-16 bg-black relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <DecorativeElements />
          </div>

          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {footerSections.map((section, index) => (
                <FooterSection key={index} {...section} />
              ))}
            </div>

            {/* Brand Section */}
            <div className="w-full flex flex-col items-center gap-8 sm:gap-12 relative z-10 border-t border-white/10 pt-12">
              <h2 className="bg-gradient-to-r from-blue-400/90 to-indigo-500/90 font-bricolage text-transparent bg-clip-text text-5xl sm:text-6xl md:text-7xl font-bold">
                Let's Health<span>Pay</span>
              </h2>

              <div className="flex flex-col items-center gap-6 w-full">
                <SocialLinks />
              </div>

              {/* Contact Section */}
              <div className="w-full border-t border-white/10 pt-4 sm:pt-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 text-sm sm:text-base text-gray-500">
                  <p className="text-center sm:text-left">© 2024 HealthPay. All rights reserved.</p>
                  <a
                    href="mailto:hello@letshealthpay.com"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2 focus:ring-offset-black rounded px-2 py-1"
                  >
                    hello@letshealthpay.com
                    <MdArrowOutward className="inline-block" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
