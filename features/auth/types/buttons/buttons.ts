/**
 * Properties for the Google authentication button component.
 * @export
 * @interface GoogleButtonProps
 */
export interface GoogleButtonProps {
  /**
   * Label text to display on the button.
   * @type {string}
   * @memberof GoogleButtonProps
   */
  label: string;

  /**
   * Test ID for automated testing.
   * @type {string}
   * @memberof GoogleButtonProps
   */
  dataTestID?: string;

  /**
   * CSS class name for styling.
   * @type {string}
   * @memberof GoogleButtonProps
   */
  className?: string;

  /**
   * Reference to the button element.
   * @type {React.Ref<HTMLButtonElement>}
   * @memberof GoogleButtonProps
   */
  ref?: React.Ref<HTMLButtonElement>;
}
