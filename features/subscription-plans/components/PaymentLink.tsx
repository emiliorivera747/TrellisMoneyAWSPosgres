"use client";

// Next.js
import Link from "next/link";

// Types
import { PaymentLinkProps } from "@/features/subscription-plans/types/subscription";

import { cn } from "@/lib/utils";

/**
 * A React component that renders a styled payment link. When clicked, it stores the provided
 * payment link in the browser's local storage under the key "stripePaymentLink".
 *
 * @component
 * @param {PaymentLinkProps} props - The props for the PaymentLink component.
 * @param {string} [props.href="#"] - The URL to navigate to when the link is clicked. Defaults to "#".
 * @param {string} [props.paymentLink] - The payment link to be stored in local storage when the link is clicked.
 * @param {string} props.text - The text to display inside the link.
 * @param {React.Ref<HTMLAnchorElement>} [props.ref] - A ref to the underlying anchor element.
 *
 * @returns {JSX.Element} A styled link component.
 *
 * @example
 * <PaymentLink
 *   href="https://example.com"
 *   text="Pay Now"
 * />
 */
const PaymentLink = ({ href, text, ref, className }: PaymentLinkProps) => {
  const defaultClasses =
    "flex items-center justify-center w-full bg-gradient-to-r from-primary-700 to-primary-800 text-white px-[.94118rem] py-[1.05882rem] h-[3.2941176471rem] rounded-[12px] hover:bg-blue-700 hover:to-blue-700 transition duration-300";
  return (
    <Link
      ref={ref}
      href={href || "#"}
      className={cn(defaultClasses, className)}
    > 
      {text}
    </Link>
  );
};
export default PaymentLink;
