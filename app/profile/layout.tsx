import { Sidebar } from "@/components/sidebar";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1">
      <Sidebar />
      <div className="flex-1 pb-20">{children}</div>
    </div>
  );
}
