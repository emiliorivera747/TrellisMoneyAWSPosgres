/**
 * Represents the base properties for a header component.
 * @interface BaseHeaderProps
 */
interface BaseHeaderProps {
    /**
     * CSS class name.
     * @type {string}
     * @memberof BaseHeaderProps
     */
    className?: string;
    /**
     * The header label text.
     * @type {string}
     * @memberof BaseHeaderProps
     */
    label: string;
    /**
     * Reference to the heading element.
     * @type {React.Ref<HTMLHeadingElement>}
     * @memberof BaseHeaderProps
     */
    ref?: React.Ref<HTMLHeadingElement>;
}

/**
 * Represents the properties for a primary header component.
 * @export
 * @typedef {BaseHeaderProps} PrimaryHeaderProps
 */
export type PrimaryHeaderProps = BaseHeaderProps;

/**
 * Represents the properties for a secondary header component.
 * @export
 * @typedef {BaseHeaderProps} SecondaryHeaderProps
 */
export type SecondaryHeaderProps = BaseHeaderProps;
