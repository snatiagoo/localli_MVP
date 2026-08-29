import { requireOnboardedBusiness } from "@/lib/dal";

export default async function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  await requireOnboardedBusiness(); // redirects to /onboarding if not done
  return <>{children}</>;
}
