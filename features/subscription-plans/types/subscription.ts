export type PaymentLinkProps = {
  href: string;
  paymentLink?: string;
  className?: string;
  label: string;
  ref?: React.Ref<HTMLAnchorElement>;
};

export interface SubscriptionCardProps {
  title: string;
  price: string;
  subscription_link_url: string;
  features: string[];
  footerDescription: string;
}
