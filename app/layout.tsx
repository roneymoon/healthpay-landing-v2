import type { Metadata } from 'next'
import { Bricolage_Grotesque } from 'next/font/google'
import Header from '@/components/header'
import './globals.css'
import { cn } from '@/lib/utils'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-bricolage',
})

export const metadata: Metadata = {
  title: "HealthPay - AI-Powered Claims Engine",
  description: "HealthPay automates adjudication across pre-auth, non-medico, medico, and audit workflows — reducing cost and turnaround time by over 70%.",
  icons: {
    icon: '/healthpay.png',
    shortcut: '/healthpay.png',
    apple: '/healthpay.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={bricolage.variable}>
      <body className={cn("font-bricolage min-h-screen bg-black")}>
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
