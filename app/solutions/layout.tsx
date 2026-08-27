import type { Metadata } from "next";
import { SolutionsFooter, SolutionsNavigation } from "../components/SolutionsChrome";
import "./solutions.css";

const title = "Web Development & SEO Services";
const description = "ARIX Solutions builds modern websites and end-to-end technology solutions that help small and medium businesses scale.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ARIX Solutions` },
  description,
  openGraph: { title: `${title} | ARIX Solutions`, description, images: [{ url: "/arix-solutions-og.png", width: 1672, height: 941, alt: "ARIX Solutions — web development and SEO for growing businesses" }] },
  twitter: { card: "summary_large_image", title: `${title} | ARIX Solutions`, description, images: ["/arix-solutions-og.png"] },
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return <div className="solutions-site"><SolutionsNavigation />{children}<SolutionsFooter /></div>;
}
