import type { Metadata } from "next";
import "./solutions.css";

const title = "Web Development & SEO Services";
const description = "ARIX builds modern websites and end-to-end technology solutions that help small and medium businesses scale.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title: `${title} | ARIX`, description, images: [] },
  twitter: { title: `${title} | ARIX`, description, images: [] },
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
