import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investments | Trellis Money",
  description:
    "Investments for Trellis Money gives you insights into your investment",
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
