import SideNavigationBar from "@/components/navigation/SideNavigationBar";
import Footer from "@/components/footers/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen mx-[4%] 2xl:mx-[25%] border-box">
      <div className="flex flex-row">
        <SideNavigationBar />
        <main className="w-full flex flex-col">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
