export const accountSideNavConfig = [
  {
    label: "Membership Details",
    url: "/account/overview",
  },
  {
    label: "Settings",
    url: "/account/settings",
  },
  {
    label: "Billing History",
    url: process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_LINK! ?? "#",
  },
];
