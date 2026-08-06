import type { Metadata } from "next";
import { ArbotsFooter, ArbotsNavigation } from "../components/ArbotsChrome";
import "./arbots.css";

export const metadata: Metadata = {
  title: "Arbots X — A companion with presence",
  description: "Meet Arbots X, an expressive AI companion robot in development under ARIX.",
  openGraph: { title: "Arbots X — A companion with presence", description: "An expressive AI companion robot in development under ARIX.", images: [{ url: "/arbots-og.png", width: 1730, height: 909, alt: "Arbots X companion robot" }] },
  twitter: { card: "summary_large_image", title: "Arbots X — A companion with presence", description: "An expressive AI companion robot in development under ARIX.", images: ["/arbots-og.png"] },
};

export default function ArbotsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="arbots-site"><ArbotsNavigation />{children}<ArbotsFooter /></div>;
}
