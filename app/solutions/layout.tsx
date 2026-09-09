import type { Metadata } from "next";
import "./solutions.css";

const title = "Axolutions // High-Performance Digital Engineering & Revenue Platforms";
const description = "Transforming legacy sites into next-gen platforms and AI - engineering solutions. What takes others weeks, we build in days.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  icons: {
    icon: [{ url: "/axolutions-logo-mark.png", type: "image/png" }],
    shortcut: "/axolutions-logo-mark.png",
    apple: [{ url: "/axolutions-logo-mark.png", type: "image/png" }],
  },
  openGraph: {
    title,
    description,
    images: [{ url: "/axolutions-logo-full.png", width: 1200, height: 630, alt: "Axolutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/axolutions-logo-full.png"],
  },
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return <div className="axolutions-wrapper">{children}</div>;
}
