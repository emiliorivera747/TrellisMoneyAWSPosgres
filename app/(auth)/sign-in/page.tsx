// Types
import { Metadata } from "next";

// Components
import NavBar from "@/components/nav-bars/SecondaryNavbar";
import SignInForm from "@/features/auth/components/form/SignInForm";
import DashboardRedirect from "@/features/auth/components/private-route/DashboardRedirect";

export const metadata: Metadata = {
  title: "Sign In | Trellis Money",
  description: "Sign in to your Trellis Money account",
};

/**
 *  Allows the user to log into their account
 */
const LoginPage = () => {
  return (
    <DashboardRedirect>
      <div className="flex flex-col items-center justify-center min-h-screen h-auto min-w-screen w-auto">
        <div className="w-full">
          <NavBar />
        </div>
        <SignInForm />
      </div>
    </DashboardRedirect>
  );
};

export default LoginPage;
