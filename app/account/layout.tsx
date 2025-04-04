import SideNavigationBar from "@/components/navigation/SideNavigationBar";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

import AccountSideNav from "@/features/user-account/components/AccountSideNav";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Trellis Money",
  description:
    "Dashboard for Trellis Money gives you insights into your investments, goals, budgets, Networth and other key financial metrics.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-h-screen ml-[2%] sm:ml-[2%] 2xl:ml-[10%] border-box">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="flex sm:flex-row flex-col">
          <SideNavigationBar />
          <main className=" sm:w-full flex flex-row">
            <AccountSideNav />
            {children}
          </main>
          <Toaster />
        </div>
      </ThemeProvider>
    </div>
  );
}
