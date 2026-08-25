import { requireEmployee } from "@/app/lib/accounts-auth";
import { getFinanceSnapshot } from "@/app/lib/accounts-db";
import { AccountsDashboard } from "@/app/components/AccountsDashboard";

export const dynamic = "force-dynamic";

export default async function AccountsPage() {
  const employee = await requireEmployee("/accounts");
  const snapshot = await getFinanceSnapshot();
  return <AccountsDashboard employee={employee} snapshot={snapshot} />;
}
