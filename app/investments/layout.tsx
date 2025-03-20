import SideNavigationBar from "@/components/navigation/SideNavigationBar";
import Footer from "@/components/footers/Footer";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Investments | Trellis Money",
  description: "Keep track of all your investments across different platforms and accounts with Trellis Money.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen mx-[2%] sm:mx-[4%] 2xl:mx-[25%] border-box">
      <div className="flex sm:flex-row flex-col">
        <SideNavigationBar />
        <main className=" sm:w-full flex flex-col ">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
