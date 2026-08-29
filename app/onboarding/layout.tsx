import { redirect } from "next/navigation";
import { getCurrentBusiness } from "@/lib/dal";

export default async function OnboardingLayout({ children }: LayoutProps<"/onboarding">) {
  const business = await getCurrentBusiness();
  if (business?.onboardingCompletedAt) {
    redirect("/dashboard");
  }
  return <>{children}</>;
}
