// Types
import { Metadata } from "next";

// Components
import SignUpForm from "@/features/auth/components/form/SignUpForm";
import NavBar from "@/components/nav-bars/SecondaryNavbar";
import DashboardRedirect from "@/features/auth/components/private-route/DashboardRedirect";

export const metadata: Metadata = {
  title: "Sign Up | Trellis Money",
  description: "Create a new account on Trellis Money",
};

const page = () => {
  return (
    <DashboardRedirect>
      <div className="flex flex-col items-center justify-center min-h-screen h-auto min-w-screen w-auto">
        <div className="w-full">
          <NavBar />
        </div>
        <SignUpForm />
      </div>
    </DashboardRedirect>
  );
};

export default page;
