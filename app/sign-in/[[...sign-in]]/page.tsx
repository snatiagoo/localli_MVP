import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 p-8">
      <div className="font-display text-2xl font-bold">
        Localli<span className="text-accent">.</span>
      </div>
      <SignIn fallbackRedirectUrl="/dashboard" />
    </div>
  );
}
