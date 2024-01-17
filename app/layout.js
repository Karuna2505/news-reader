"use client"
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthContextProvider } from './context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <head>
        <title>News App</title>
        <meta name='description' content='Read news article' />
      </head>
      <body className={inter.className}>
      <AuthContextProvider>
      {children}
      </AuthContextProvider>
      </body>
    </html>
  )
}
