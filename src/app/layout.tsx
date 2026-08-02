import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { org } from "@/content/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "A nonprofit researching the biology of fungal disease and building open, rigorously validated science to keep antifungal medicines working.";

export const metadata: Metadata = {
  metadataBase: new URL("https://antifungalresistance.vercel.app"),
  title: `${org.name} — ${org.mission}`,
  description,
  openGraph: {
    type: "website",
    title: `${org.name} — ${org.mission}`,
    description,
    siteName: org.name,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${org.name} — ${org.mission}`,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
