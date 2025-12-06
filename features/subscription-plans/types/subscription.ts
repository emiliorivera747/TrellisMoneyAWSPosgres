export type PaymentLinkProps = {
  href: string;
  paymentLink?: string;
  text: string;
  ref?: React.Ref<HTMLAnchorElement>;
};

export interface SubscriptionCardProps {
  title: string;
  price: string;
  price_id: string;
  features: string[];
  footerDescription: string;
}
