import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { Footer } from "./components/Footer";
import { Navigation } from "./components/Navigation";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  return {
    title: { default: "ARIX — Physical AI for Precision Agriculture", template: "%s | ARIX" },
    description: "ARIX is building an AI-powered crop intelligence system for disease detection, field mapping, and precision agriculture.",
    openGraph: {
      title: "ARIX — See disease sooner. Treat only what matters.",
      description: "Physical AI for precision agriculture.",
      type: "website",
      images: [{ url: `${origin}/og.png`, width: 1730, height: 941, alt: "ARIX precision agriculture drone scanning a wheat field" }],
    },
    twitter: { card: "summary_large_image", title: "ARIX — Physical AI for Precision Agriculture", description: "See disease sooner. Treat only what matters.", images: [`${origin}/og.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: `(function(){try{var saved=localStorage.getItem('arix-theme-v2');document.documentElement.dataset.theme=saved==='dark'?'dark':'light';}catch(e){document.documentElement.dataset.theme='light';}})();` }} /></head><body className={`${geistSans.variable} ${geistMono.variable}`}><Navigation />{children}<Footer /></body></html>;
}
