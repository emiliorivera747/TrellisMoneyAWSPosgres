export const dynamic = "force-dynamic";

// Types
import { Metadata } from "next";

// Components
import HeroSection from "@/components/marketing/layout/HeroSection";
import Navbar from "@/components/nav-bars/NavBar";
import Footer from "@/components/footers/Footer";
import PricingSection from "@/features/subscription-plans/components/PricingSection";
import ProjectSection from "@/components/marketing/layout/ProjectSection";

// Utils
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Trellis Money - Seeing value where others don't",
  description:
    "Trellis Money is a personal finance management tool. Track investments across all accounts. Set goals and budgets. Get insights into your spending.",
  keywords: [
    "personal finance",
    "finance management",
    "investment tracking",
    "budgeting",
    "spending insights",
    "financial goals",
    "Trellis Money",
  ],
};

/**
 *
 * Landing page for Trellis Money
 *
 */
/**
 * The `Home` component serves as the main entry point for the application.
 * It fetches the authenticated user data from Supabase and renders the
 * main sections of the page, including the Navbar, HeroSection, PricingSection,
 * and Footer. The authentication status is passed as a prop to the relevant components.
 *
 * @async
 * @function
 * @returns {JSX.Element} The rendered JSX for the home page.
 *
 * @remarks
 * - This component uses the `createClient` function to initialize the Supabase client.
 * - The `supabase.auth.getUser` method is used to retrieve the current authenticated user.
 * - The `isAuthenticated` prop is derived from the presence of a user object.
 *
 * @example
 * ```tsx
 * import Home from './page';
 *
 * export default function App() {
 *   return <Home />;
 * }
 * ```
 */
export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="bg-white dark:bg-gray-900 h-auto">
      <Navbar isAuthenticated={!!user} />
      <HeroSection isAuthenticated={!!user} />
      {!user && (
        <ProjectSection
          subtitle="Plan for the Future"
          url={"/#"}
          title={"Forecast"}
          videoUrl={
            "https://res.cloudinary.com/dxxdfgpdh/video/upload/v1772235119/Portfolio_Video_2_tupy6r.mp4"
          }
          buttonLabel={"Learn More"}
          titleClassName="text-2xl sm:text-4xl text-tertiary-1000 font-semibold"
          buttonClassName="flex items-center absolute rounded-[12px] border-2 border-zinc-800 hover:border-zinc-800 bg-transparent text-[#495057] w-60 h-[3.6rem] font-semibold self-center justify-center text-center p-2 bottom-6 hover:bg-tertiary-1000 hover:text-white"
          bgColor="bg-white"
          videoCover="sm:object-cover"
        />
      )}
      {!user && <PricingSection />}
      <Footer />
    </div>
  );
}
