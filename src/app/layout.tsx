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

// Runs synchronously during HTML parsing, before first paint, so the saved
// (or system) theme is applied with no flash of the wrong palette. Default is
// light; a stored preference or the OS setting can switch it to dark.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
