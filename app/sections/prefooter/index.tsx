import { type FC } from 'react'
import Link from 'next/link'
import LayoutWrapper from '@/components/layout-wrapper'

const PreFooter: FC = () => {
  return (
    <section className="relative bg-black py-24 overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-95" />
      
      {/* Subtle blue glow effects */}
      <div className="absolute -top-1/2 -left-1/4 w-1/2 h-1/2 rounded-full blur-3xl bg-blue-600/5" />
      <div className="absolute -bottom-1/2 -right-1/4 w-1/2 h-1/2 rounded-full blur-3xl bg-indigo-600/5" />

      <LayoutWrapper>
        <div className="relative z-10 flex justify-between flex-col md:flex-row gap-6 items-center">
          <div>
            <h3 className="text-[40px] sm:text-[56px] leading-[1.1] tracking-[-0.0325em] font-medium text-white">
              Plan the present.
              <br />
              Build the future.
            </h3>
          </div>

          <div className="flex items-end">
            <div className="flex gap-3 items-center">
              <Link 
                className="font-medium text-base px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25" 
                href='/'
              >
                Get Started
              </Link>
              <Link 
                className="font-medium text-base px-6 py-2.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all duration-300 backdrop-blur-sm" 
                href='/'
              >
                Talk to sales
              </Link>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  )
}

export default PreFooter
