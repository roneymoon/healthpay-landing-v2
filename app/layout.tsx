import type { Metadata } from 'next'
import Header from '@/components/header'
import Footer from '@/components/footer'
import './globals.css'
import { cn } from '@/lib/utils'
import { Sora, Space_Grotesk } from 'next/font/google'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "HealthPay - AI-Powered Claims Engine",
  description: "HealthPay automates adjudication across pre-auth, non-medico, medico, and audit workflows — reducing cost and turnaround time by over 70%.",
  icons: {
    icon: '/healthpay.png',
    shortcut: '/healthpay.png',
    apple: '/healthpay.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>	
      <body className={cn(sora.className, spaceGrotesk.className)}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
