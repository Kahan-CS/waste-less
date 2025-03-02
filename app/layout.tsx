import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Waste-less",
  description: "Helping you waste LESS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-[#097969] py-4 text-center">
          <p>&copy; 2025 Waste-less. Made with love by: UNIKS.</p>
      </footer>
      </body>
    </html>
  );
}
