import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Service Request Board",
  description: "GlobalTNA Full-Stack Assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen`}>
        <nav className="bg-blue-600 text-white shadow-md">
          <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold tracking-wide">
              GlobalTNA Services
            </Link>
            <Link href="/new" className="bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-gray-100 transition">
              + Post a Job
            </Link>
          </div>
        </nav>
        <div className="max-w-5xl mx-auto px-6 py-8">
          {children}
        </div>
      </body>
    </html>
  );
}