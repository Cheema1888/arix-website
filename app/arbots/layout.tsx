import type { Metadata } from "next";
import { ArbotsFooter, ArbotsNavigation } from "../components/ArbotsChrome";
import "./arbots.css";

export const metadata: Metadata = {
  title: "VBot — A companion with presence",
  description: "Meet VBot, an expressive AI companion robot in development under ARIX.",
  openGraph: { title: "VBot — A companion with presence", description: "An expressive AI companion robot in development under ARIX.", images: [{ url: "/arbots-og.png", width: 1730, height: 909, alt: "VBot companion robot" }] },
  twitter: { card: "summary_large_image", title: "VBot — A companion with presence", description: "An expressive AI companion robot in development under ARIX.", images: ["/arbots-og.png"] },
};

export default function ArbotsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="arbots-site"><ArbotsNavigation />{children}<ArbotsFooter /></div>;
}
