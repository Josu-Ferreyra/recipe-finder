import Link from 'next/link'
import { type ReactNode } from 'react'

export function ContentLayout ({ children }: { children: ReactNode }) {
  return (
    <div className='grid grid-rows-[5rem,1fr,5rem]'>
      <header className='bg-zinc-950'>
        <nav className='max-w-4xl m-auto p-3 flex items-center h-full'>
          <Link href='/' className='text-xl font-bold'>The Recipe Finder</Link>
        </nav>
      </header>
      <main className='bg-zinc-950 relative isolate'>
        <div className='mainBackground inset-0 absolute -z-10' />
        {children}
      </main>
      <footer className='bg-zinc-950 h-full flex items-center relative z-0'>
        <p className='max-w-4xl m-auto p-3'>🍅 Made By Josu 🍅</p>
      </footer>
    </div>
  )
}
