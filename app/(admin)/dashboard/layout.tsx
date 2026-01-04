import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Trellis Money",
  description:
    "Dashboard for Trellis Money provides an overview of your financial activities and insights.",
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
