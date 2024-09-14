import SectionSeparator from "@/components/global/section-separator";
import Sidebar from "./sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-screen overflow-hidden mt-20">
        <Sidebar />
        <div className="flex flex-col overflow-y-auto no-scrollbar flex-1 max-w-screen-2xl mx-auto p-4 py-6">
          <main className="bg-transparent flex-1">{children}</main>
        </div>
      </div>
      <SectionSeparator />
    </>
  );
}
