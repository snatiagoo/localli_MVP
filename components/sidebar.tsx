import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { Sparkles, SlidersHorizontal, UserCircle, LogOut } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const DASHBOARD_ITEMS = [
  { href: "/dashboard#sugerencias", label: "Sugerencias", icon: Sparkles },
  { href: "/dashboard#ajustes", label: "Ajustes", icon: SlidersHorizontal },
];

export function Sidebar() {
  return (
    // Two jobs split across two elements: this outer <aside> only supplies
    // the tall navy background (self-stretch to the row, so the color
    // reaches the footer on long pages) — it is NOT itself sticky. The
    // inner div below is the one that's sticky, and it's capped at exactly
    // the screen height, so it behaves like a normal pinned panel instead
    // of a sticky element fighting its own stretched-to-the-whole-page size.
    <aside className="w-24 sm:w-28 shrink-0 self-stretch min-h-screen bg-primary">
      <div className="sticky top-0 h-screen flex flex-col items-center gap-10 py-8 px-3">
        <Link href="/dashboard" className="font-display text-lg font-bold text-white">
          L<span className="text-accent">.</span>
        </Link>

        <div className="flex flex-col items-center gap-6 w-full">
          <span className="text-[10px] font-bold tracking-wider text-white/50">DASHBOARD</span>
          <nav className="flex flex-col items-center gap-3 w-full">
            {DASHBOARD_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center gap-2 w-full rounded-xl py-4 text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <Icon size={24} strokeWidth={1.75} />
                  <span className="text-[11px] font-semibold text-center leading-tight">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="h-px w-8 bg-white/15" />

        <div className="flex flex-col items-center gap-6 w-full">
          <span className="text-[10px] font-bold tracking-wider text-white/50">CUENTA</span>
          <Link
            href="/profile"
            className="flex flex-col items-center gap-2 w-full rounded-xl py-4 text-white/80 hover:bg-white/10 hover:text-white"
          >
            <UserCircle size={24} strokeWidth={1.75} />
            <span className="text-[11px] font-semibold">Perfil</span>
          </Link>
          <SignOutButton redirectUrl="/">
            <button
              type="button"
              className="flex flex-col items-center gap-2 w-full rounded-xl py-4 text-white/80 hover:bg-white/10 hover:text-white"
            >
              <LogOut size={24} strokeWidth={1.75} />
              <span className="text-[11px] font-semibold">Salir</span>
            </button>
          </SignOutButton>
        </div>

        <div className="mt-auto">
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
