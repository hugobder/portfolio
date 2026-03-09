import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { Navbar } from "@/components/portfolio/navbar";
import { Footer } from "@/components/portfolio/footer";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bruderhugo.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hugo Bruder | Full Stack Developer",
    template: "%s | Hugo Bruder",
  },
  description:
    "Full Stack Developer specializing in modern web applications with React, Next.js, Node.js, and TypeScript. Available for freelance and internship opportunities.",
  keywords: [
    "Hugo Bruder",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Web Developer",
    "Portfolio",
  ],
  authors: [{ name: "Hugo Bruder", url: siteUrl }],
  creator: "Hugo Bruder",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Hugo Bruder – Portfolio",
    title: "Hugo Bruder | Full Stack Developer",
    description:
      "Full Stack Developer specializing in modern web applications with React, Next.js, Node.js, and TypeScript.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hugo Bruder | Full Stack Developer",
    description:
      "Full Stack Developer specializing in modern web applications with React, Next.js, Node.js, and TypeScript.",
    creator: "@hugobder",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
