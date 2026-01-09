/**
 * Represents the properties for a primary button component.
 * @export
 * @interface PrimaryButtonProps
 */
export interface PrimaryButtonProps {
  /**
   * The background color of the button.
   * @type {string}
   * @memberof PrimaryButtonProps
   */
  bgColor?: string;

  /**
   * The text color of the button.
   * @type {string}
   * @memberof PrimaryButtonProps
   */
  textColor?: string;

  /**
   * The background color of the button when hovered.
   * @type {string}
   * @memberof PrimaryButtonProps
   */
  hoverBgColor?: string;

  /**
   * The text to be displayed on the button.
   * @type {string}
   * @memberof PrimaryButtonProps
   */
  text?: string;

  /**
   * Indicates whether the button should have a linear gradient background.
   * @type {boolean}
   * @memberof PrimaryButtonProps
   */
  withLinearGradient?: boolean;

  /**
   * The starting color of the linear gradient background.
   * @type {string}
   * @memberof PrimaryButtonProps
   */
  bgFrom?: string;

  /**
   * The ending color of the linear gradient background.
   * @type {string}
   * @memberof PrimaryButtonProps
   */
  bgTo?: string;

  /**
   * The starting color of the linear gradient background when hovered.
   * @type {string}
   * @memberof PrimaryButtonProps
   */
  hoverBgFrom?: string;

  /**
   * The ending color of the linear gradient background when hovered.
   * @type {string}
   * @memberof PrimaryButtonProps
   */
  hoverBgTo?: string;

  /**
   * The function to be executed when the button is clicked.
   * @type {() => void}
   * @memberof PrimaryButtonProps
   */
  actionFunction: () => void;

  /**
   * The horizontal padding of the button.
   * @type {string}
   * @memberof PrimaryButtonProps
   */
  px?: string;

  /**
   * The vertical padding of the button.
   * @type {string}
   * @memberof PrimaryButtonProps
   */
  py?: string;

  /**
   * The height of the button.
   * @type {string}
   * @memberof PrimaryButtonProps
   */
  h?: string;

  /**
   * The width of the button.
   * @type {string}
   * @memberof PrimaryButtonProps
   */
  w?: string;

  /**
   * The border-radius of the button, defining how rounded the corners are.
   * @type {string}
   * @memberof PrimaryButtonProps
   */
  rounded?: string;
}

/**
 * Represents the properties for a customizable submit button component.
 * @export
 * @interface SubmitButtonProps
 */
export interface SubmitButtonProps {
  /**
   * A reference to the button element.
   * @type {React.ButtonHTMLAttributes<HTMLButtonElement>}
   * @memberof SubmitButtonProps
   */
  ref?: React.ButtonHTMLAttributes<HTMLButtonElement>;

  /**
   * Additional CSS class names to apply to the button.
   * @type {string}
   * @memberof SubmitButtonProps
   */
  className?: string;

  /**
   * The background color of the button.
   * @type {string}
   * @memberof SubmitButtonProps
   */
  bgColor?: string;

  /**
   * The text color of the button.
   * @type {string}
   * @memberof SubmitButtonProps
   */
  textColor?: string;

  /**
   * The background color of the button when hovered.
   * @type {string}
   * @memberof SubmitButtonProps
   */
  hoverBgColor?: string;

  /**
   * The text to display inside the button.
   * @type {string}
   * @memberof SubmitButtonProps
   */
  text?: string;

  /**
   * Indicates whether the button should have a linear gradient background.
   * @type {boolean}
   * @memberof SubmitButtonProps
   */
  withLinearGradient?: boolean;

  /**
   * The starting color of the linear gradient background.
   * @type {string}
   * @memberof SubmitButtonProps
   */
  bgFrom?: string;

  /**
   * The ending color of the linear gradient background.
   * @type {string}
   * @memberof SubmitButtonProps
   */
  bgTo?: string;

  /**
   * The starting color of the linear gradient background when hovered.
   * @type {string}
   * @memberof SubmitButtonProps
   */
  hoverBgFrom?: string;

  /**
   * The ending color of the linear gradient background when hovered.
   * @type {string}
   * @memberof SubmitButtonProps
   */
  hoverBgTo?: string;

  /**
   * The width of the button.
   * @type {string}
   * @memberof SubmitButtonProps
   */
  w?: string;

  /**
   * The horizontal padding of the button.
   * @type {string}
   * @memberof SubmitButtonProps
   */
  px?: string;

  /**
   * The vertical padding of the button.
   * @type {string}
   * @memberof SubmitButtonProps
   */
  py?: string;

  /**
   * The height of the button.
   * @type {string}
   * @memberof SubmitButtonProps
   */
  h?: string;

  /**
   * The border radius of the button, defining how rounded the corners are.
   * @type {string}
   * @memberof SubmitButtonProps
   */
  rounded?: string;
}


/**
 * Represents the properties for a SubmitButton component.
 * @export
 * @interface SubmitButtonPropsV2
 */
export interface SubmitButtonPropsV2 {
  /**
   * A reference to the HTML button element.
   * This can be used to directly interact with the button element in the DOM.
   * @type {React.Ref<HTMLButtonElement>}
   * @memberof SubmitButtonPropsV2
   */
  ref?: React.Ref<HTMLButtonElement>;

  /**
   * Additional CSS class names to apply to the button for styling.
   * @type {string}
   * @memberof SubmitButtonPropsV2
   */
  className?: string;

  /**
   * The text to be displayed on the button.
   * If not provided, the button may render without any text.
   * @type {string}
   * @memberof SubmitButtonPropsV2
   */
  text?: string;

  /**
   * Indicates whether the button is in a loading state.
   * When `true`, the button may display a loading spinner or similar indicator.
   * @type {boolean}
   * @memberof SubmitButtonPropsV2
   */
  isLoading?: boolean;
}

/**
 * Represents the properties for a primary modal button component.
 * @export
 * @interface PrimaryModalButtonProp
 */
export interface PrimaryModalButtonProp {
  /**
   * A reference to the HTML button element.
   * This can be used to directly interact with the button in the DOM.
   * @type {React.Ref<HTMLButtonElement>}
   * @memberof PrimaryModalButtonProp
   */
  ref?: React.Ref<HTMLButtonElement>;

  /**
   * The text label displayed on the button.
   * @type {string}
   * @memberof PrimaryModalButtonProp
   */
  label: string;

  /**
   * The CSS class name(s) applied to the button for styling.
   * @type {string}
   * @memberof PrimaryModalButtonProp
   */
  className: string;

  /**
   * The event handler function triggered when the button is clicked.
   * @type {React.MouseEventHandler<HTMLButtonElement>}
   * @memberof PrimaryModalButtonProp
   */
  onClickFn: React.MouseEventHandler<HTMLButtonElement>;
}