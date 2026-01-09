/**
 * Represents the properties for a side navigation item link.
 * @export
 * @interface SideNavItemLinkProps
 */
export interface SideNavItemLinkProps {
  /**
   * The URL for the navigation link.
   * @type {string}
   * @memberof SideNavItemLinkProps
   */
  href: string;
  /**
   * The SVG path data for the icon.
   * @type {string}
   * @memberof SideNavItemLinkProps
   */
  svg_d: string;
  /**
   * The current pathname.
   * @type {string}
   * @memberof SideNavItemLinkProps
   */
  currentPath: string;
  /**
   * The label text for the link.
   * @type {string}
   * @memberof SideNavItemLinkProps
   */
  label: string;
  /**
   * Whether the user is subscribed.
   * @type {boolean}
   * @memberof SideNavItemLinkProps
   */
  isSubscribed: boolean;
}

/**
 * Represents the properties for a tooltip component.
 * @export
 * @interface TooltipProps
 */
export interface TooltipProps {
  /**
   * The label text for the tooltip.
   * @type {string}
   * @memberof TooltipProps
   */
  label: string;
  /**
   * The children elements to wrap with the tooltip.
   * @type {React.ReactNode}
   * @memberof TooltipProps
   */
  children: React.ReactNode;
}
