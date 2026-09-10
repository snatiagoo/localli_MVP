
import { redirect } from "next/navigation";
import { getCurrentBusiness } from "@/lib/dal";

export default async function OnboardingLayout({ children }: LayoutProps<"/onboarding">) {
  const business = await getCurrentBusiness();
  if (business?.onboardingCompletedAt) {
    redirect("/dashboard");
  }
  return (
    <div className="flex flex-1 flex-col">
      <div className="px-10 py-6">
        <div className="font-display text-xl font-bold">
          Localli<span className="text-accent">.</span>
        </div>
      </div>
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
