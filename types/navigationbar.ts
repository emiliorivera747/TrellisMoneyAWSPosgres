export interface SideNavItemLinkProps {
  href: string;
  svg_d: string;
  currentPath: string;
  label: string;
  isSubscribed: boolean;
}
export interface TooltipProps {
  label: string;
  children: React.ReactNode;
}
