import { Separator } from "@/components/ui/separator";
import Sidebar from "./Sidebar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 className="text-2xl pl-4">Dashboard</h2>
      <Separator className="mt-2 text-white" />
      <section className="grid lg:grid-cols-12 gap-12 mt-12">
        <div className="lg:acol-span-2">
          <Sidebar />
        </div>
        <div className="lg:col-span-10 px-4 lg:ml-5">{children}</div>
      </section>
    </>
  );
}
export default DashboardLayout;
