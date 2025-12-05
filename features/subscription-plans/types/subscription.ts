export type PaymentLinkProps = {
  href: string;
  paymentLink?: string;
  text: string;
  ref?: React.Ref<HTMLAnchorElement>;
};

export interface SubscriptionCardProps {
  title: string;
  price: string;
  features: string[];
  payment_link: string;
  footerDescription: string;
}
