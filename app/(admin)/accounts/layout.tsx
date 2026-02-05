// Types
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accounts | Trellis Money",
  description:
    "Accounts for Trellis Money provides an overview of your account details and activities.",
};

/**
 * Layout component for the investments admin section.
 *
 * @param children - The React nodes to be rendered within the layout.
 * @returns A section element wrapping the provided children.
 */
export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
