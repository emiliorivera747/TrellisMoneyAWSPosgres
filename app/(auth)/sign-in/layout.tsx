// Types
import { Metadata } from "next";

// Components
import Footer from "@/components/footers/Footer";

export const metadata: Metadata = {
  title: "Sign Up | Trellis Money",
  description: "Create a new account on Trellis Money",
};

/**
 * A layout component for the Sign-Up page that centers its children both
 * vertically and horizontally within the viewport.
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The child components or elements
 * to be rendered inside the layout.
 *
 * @returns {JSX.Element} A div container that wraps the children and applies
 * flexbox styling to center them.
 */
export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen w-full ">
      {children}
      <Footer />
    </section>
  );
}
