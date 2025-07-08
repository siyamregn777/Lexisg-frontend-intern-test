import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lexi Legal Assistant',
  description: 'Ask legal questions and view case-based citations.',
}

export default function RootLayout(
  { children }: {
     children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 ml-20 mt-5">{children}</body>
    </html>
  )
}
