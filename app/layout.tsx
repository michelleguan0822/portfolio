import type { Metadata } from 'next'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import BottomNav from '@/components/BottomNav'

export const metadata: Metadata = {
  title: 'Michelle Guan | Product Designer',
  description: 'Portfolio of Michelle Guan, a Product Designer crafting intuitive and emotionally engaging experiences for clinical, enterprise, and AI products.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <BottomNav />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
