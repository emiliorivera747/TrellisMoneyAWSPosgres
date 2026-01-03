import SideNavigationBar from "@/components/navigation/SideNavigationBar";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trellis Money - Accounts",
  description:
    "Accounts for Trellis Money allow you to access accounts from a variety of financial institutions.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-h-screen ml-[2%] sm:ml-[2%] 2xl:ml-[10%] border-box">
      <div className="flex sm:flex-row flex-col">
        <SideNavigationBar />
        <main className=" sm:w-full flex flex-col">{children}</main>
        <Toaster />
      </div>
    </div>
  );
}
