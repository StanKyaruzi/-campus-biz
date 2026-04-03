import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Campus Biz',
  description: 'Buy and sell on campus',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {children}
      </body>
    </html>
  )
}