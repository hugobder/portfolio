import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/providers/theme-provider";
import { Navbar } from "@/components/portfolio/navbar";
import { Footer } from "@/components/portfolio/footer";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bruderhugo.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hugo Bruder | Développeur Junior",
    template: "%s | Hugo Bruder",
  },
  description:
    "Développeur Junior spécialisé dans les applications web modernes avec React, Next.js, Node.js et TypeScript. Disponible pour des missions freelance et des stages.",
  keywords: [
    "Hugo Bruder",
    "Développeur Junior",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Développeur Web",
    "Portfolio",
  ],
  authors: [{ name: "Hugo Bruder", url: siteUrl }],
  creator: "Hugo Bruder",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Hugo Bruder – Portfolio",
    title: "Hugo Bruder | Développeur Junior",
    description:
      "Développeur Junior spécialisé dans les applications web modernes avec React, Next.js, Node.js et TypeScript.",
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
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${dmSans.variable} ${GeistMono.variable} antialiased min-h-screen flex flex-col`}
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
