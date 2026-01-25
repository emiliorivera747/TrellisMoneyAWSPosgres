import React from 'react';

import './button.css';

/**
 * Properties for the Button component in Storybook.
 * @export
 * @interface ButtonProps
 */
export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   * @type {boolean}
   * @memberof ButtonProps
   */
  primary?: boolean;

  /**
   * What background color to use.
   * @type {string}
   * @memberof ButtonProps
   */
  backgroundColor?: string;

  /**
   * How large should the button be?
   * @type {'small' | 'medium' | 'large'}
   * @memberof ButtonProps
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Button contents.
   * @type {string}
   * @memberof ButtonProps
   */
  label: string;

  /**
   * Optional click handler.
   * @type {() => void}
   * @memberof ButtonProps
   */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      {...props}
    >
      {label}
      <style jsx>{`
        button {
          background-color: ${backgroundColor};
        }
      `}</style>
    </button>
  );
};
