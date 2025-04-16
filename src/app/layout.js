'use client';

import './globals.css';
import Navbar from './components/Navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-indigo-100 to-blue-100 min-h-screen text-gray-800">
        <Navbar />
        <main className="pt-8">{children}</main>
      </body>
    </html>
  );
}
