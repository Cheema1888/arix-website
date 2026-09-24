import type { Metadata } from "next";
import { ArbotsFooter, ArbotsNavigation } from "../components/ArbotsChrome";
import "./arbots.css";

export const metadata: Metadata = {
  title: { absolute: "VBot: Intelligent Elder Care Companion Robot | ARIX" },
  description: "Meet VBot, an ambient desk companion robot for elderly safety monitoring, fall verification, offline medication reminders, and caregiver peace of mind.",
  icons: {
    icon: [
      { url: "/arbots/v-favicon.svg", type: "image/svg+xml" },
      { url: "/arbots/v-favicon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/arbots/v-favicon.png",
    apple: [{ url: "/arbots/v-apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: { title: "VBot: Intelligent Elder Care Companion Robot | ARIX", description: "An ambient companion robot for elderly safety monitoring, fall verification, offline medication reminders, and caregiver peace of mind.", images: [{ url: "/arbots-og.png", width: 1730, height: 909, alt: "VBot elder care companion robot" }] },
  twitter: { card: "summary_large_image", title: "VBot: Intelligent Elder Care Companion Robot | ARIX", description: "An ambient companion robot for elderly safety monitoring, fall verification, offline medication reminders, and caregiver peace of mind.", images: ["/arbots-og.png"] },
};

export default function ArbotsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="arbots-site"><ArbotsNavigation />{children}<ArbotsFooter /></div>;
}
