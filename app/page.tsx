
import Link from "next/link";
export const dynamic = "force-dynamic";

// Components
import SignInButton from "@/components/sign in/SignInButton";
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="bg-white h-screen">
      <nav className="flex justify-between p-4 border-b border-gray-200 mx-10">
        <div className="flex items-center">
          {/* <img src="/logo.png" alt="Trellis Money Logo" className="h-10 mr-4" /> */}
          <span className="text-xl font-bold">Trellis Money</span>
        </div>
        <SignInButton/>
      </nav>
      <header className="text-center   h-[25rem] items-center flex flex-col mt-[10%] bg-white">
        <h1 className="text-3xl font-bold">Welcome to Trellis Money</h1>
        <p className="mt-4">
          Your personal finance management tool to track investments across all
          accounts.
        </p>
        <button className="mt-4 px-8 py-4 bg-blue-500 text-white border-none rounded cursor-pointer">
          Get Started
        </button>
      </header>
      <Footer/>
    </div>
  );
}
