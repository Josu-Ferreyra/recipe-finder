import './globals.css'
import { type ReactNode } from 'react'
import { type Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Recipe Finder',
  description: "The Recipe Finder is a comprehensive recipe search engine that allows you to find recipes by name, ingredients, diet type, and nutrients. Whether you're looking for a vegan lasagna, a gluten-free cake, or a high-protein breakfast, The Recipe Finder has you covered."
}

export default function RootLayout ({
  children
}: {
  children: ReactNode
}) {
  return (
    <html lang='en-US'>
      <body className={`${inter.className} grid min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
