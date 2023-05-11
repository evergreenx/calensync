import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/ui/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Calensync',
  description: 'fix unnecessary discusion ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header/>

        <div className='max-w-5xl mx-auto'>
        {children}

        </div>
 
   
       </body>
    </html>
  )
}
