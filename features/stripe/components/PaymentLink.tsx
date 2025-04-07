"use client";

import Link from "next/link";

type PaymentLinkProps = {
  href: string;
  paymentLink?: string;
  text: string;
  ref?: React.Ref<HTMLAnchorElement>;
};

const PaymentLink = ({ href, paymentLink, text, ref }: PaymentLinkProps) => {
  return (
    <Link
      ref={ref}
      href={paymentLink || "#"}
      className={"flex items-center justify-center w-full bg-gradient-to-r from-primary-700 to-primary-800 text-white px-[.94118rem] py-[1.05882rem] h-[3.2941176471rem] rounded-[12px] hover:bg-blue-700 hover:to-blue-700 transition duration-300"}
    //   onClick={() => {
    //     if (paymentLink) {
    //       localStorage.setItem("stripePaymentLink", paymentLink);
    //     }
    //   }}
    >
      {text}
    </Link>
  );
};
export default PaymentLink;
