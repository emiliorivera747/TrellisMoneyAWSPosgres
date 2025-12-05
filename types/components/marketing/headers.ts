interface BaseHeaderProps {
    className: string;
    label: string;
    ref?: React.Ref<HTMLHeadingElement>;
}

export type PrimaryHeaderProps = BaseHeaderProps;
export type SecondaryHeaderProps = BaseHeaderProps;
