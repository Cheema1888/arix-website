import type { Metadata } from "next";
import "./accounts.css";

export const metadata: Metadata = {
  title: "Employee Accounts",
  description: "Private ARIX employee accounting and finance portal.",
  robots: { index: false, follow: false, noarchive: true },
};

export default function AccountsLayout({ children }: { children: React.ReactNode }) {
  return <div className="accounts-app">{children}</div>;
}
