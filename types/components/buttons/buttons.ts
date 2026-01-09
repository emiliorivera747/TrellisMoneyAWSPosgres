/**
 * Represents the properties for a primary button component.
 */
export interface PrimaryButtonProps {
  /**
   * The background color of the button.
   */
  bgColor?: string;

  /**
   * The text color of the button.
   */
  textColor?: string;

  /**
   * The background color of the button when hovered.
   */
  hoverBgColor?: string;

  /**
   * The text to be displayed on the button.
   */
  text?: string;

  /**
   * Indicates whether the button should have a linear gradient background.
   */
  withLinearGradient?: boolean;

  /**
   * The starting color of the linear gradient background.
   */
  bgFrom?: string;

  /**
   * The ending color of the linear gradient background.
   */
  bgTo?: string;

  /**
   * The starting color of the linear gradient background when hovered.
   */
  hoverBgFrom?: string;

  /**
   * The ending color of the linear gradient background when hovered.
   */
  hoverBgTo?: string;

  /**
   * The function to be executed when the button is clicked.
   */
  actionFunction: () => void;

  /**
   * The horizontal padding of the button.
   */
  px?: string;

  /**
   * The vertical padding of the button.
   */
  py?: string;

  /**
   * The height of the button.
   */
  h?: string;

  /**
   * The width of the button.
   */
  w?: string;

  /**
   * The border-radius of the button, defining how rounded the corners are.
   */
  rounded?: string;
}

/**
 * Represents the properties for a customizable submit button component.
 */
export interface SubmitButtonProps {
  /**
   * A reference to the button element.
   */
  ref?: React.ButtonHTMLAttributes<HTMLButtonElement>;

  /**
   * Additional CSS class names to apply to the button.
   */
  className?: string;

  /**
   * The background color of the button.
   */
  bgColor?: string;

  /**
   * The text color of the button.
   */
  textColor?: string;

  /**
   * The background color of the button when hovered.
   */
  hoverBgColor?: string;

  /**
   * The text to display inside the button.
   */
  text?: string;

  /**
   * Indicates whether the button should have a linear gradient background.
   */
  withLinearGradient?: boolean;

  /**
   * The starting color of the linear gradient background.
   */
  bgFrom?: string;

  /**
   * The ending color of the linear gradient background.
   */
  bgTo?: string;

  /**
   * The starting color of the linear gradient background when hovered.
   */
  hoverBgFrom?: string;

  /**
   * The ending color of the linear gradient background when hovered.
   */
  hoverBgTo?: string;

  /**
   * The width of the button.
   */
  w?: string;

  /**
   * The horizontal padding of the button.
   */
  px?: string;

  /**
   * The vertical padding of the button.
   */
  py?: string;

  /**
   * The height of the button.
   */
  h?: string;

  /**
   * The border radius of the button, defining how rounded the corners are.
   */
  rounded?: string;
}


/**
 * Represents the properties for a SubmitButton component.
 */
export interface SubmitButtonPropsV2 {
  /**
   * A reference to the HTML button element.
   * This can be used to directly interact with the button element in the DOM.
   */
  ref?: React.Ref<HTMLButtonElement>;

  /**
   * Additional CSS class names to apply to the button for styling.
   */
  className?: string;

  /**
   * The text to be displayed on the button.
   * If not provided, the button may render without any text.
   */
  text?: string;

  /**
   * Indicates whether the button is in a loading state.
   * When `true`, the button may display a loading spinner or similar indicator.
   */
  isLoading?: boolean;
}

/**
 * Represents the properties for a primary modal button component.
 */
export interface PrimaryModalButtonProp {
  /**
   * A reference to the HTML button element.
   * This can be used to directly interact with the button in the DOM.
   */
  ref?: React.Ref<HTMLButtonElement>;

  /**
   * The text label displayed on the button.
   */
  label: string;

  /**
   * The CSS class name(s) applied to the button for styling.
   */
  className: string;

  /**
   * The event handler function triggered when the button is clicked.
   * 
   * @param event - The mouse event associated with the button click.
   */
  onClickFn: React.MouseEventHandler<HTMLButtonElement>;
}