import SideNavigationBar from "@/components/navigation/SideNavigationBar";
import Footer from "@/components/footers/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div className="h-screen mx-[2%] sm:mx-[4%] 2xl:mx-[20%] border-box">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="flex sm:flex-row flex-col">
          <SideNavigationBar />
          <main className=" sm:w-full flex flex-col ">
            {children}
          </main>
          <Toaster />
        </div>
        <Footer />
      </ThemeProvider>
    </div>
  );
}
