'use client';

import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';

// Wrapper component to use the theme context
function LayoutContent({ children }) {
  const { theme } = useTheme();
  
  return (
    <body className={`bg-gray-50 ${theme === 'dark' ? 'bg-gray-900' : ''} transition-colors duration-300`}>
      <AnimatePresence mode="wait" initial={true}>
        {children}
      </AnimatePresence>
    </body>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>MD. Bodiuzaman - ELV Technician & IT Professional</title>
        <meta name="description" content="Professional portfolio of MD. Bodiuzaman - ELV Technician, Computer Science graduate, and IT professional with expertise in home automation, security systems, and networking." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <LayoutContent>{children}</LayoutContent>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </html>
  );
}