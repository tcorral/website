import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const displayFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const monoFont = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tomás Corral | Staff Engineer",
  description:
    "Professional website of Tomás Corral, Staff Engineer focused on AI-native developer enablement, architecture, and engineering leadership.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${monoFont.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[#06070b] text-zinc-100">{children}</body>
    </html>
  );
}
