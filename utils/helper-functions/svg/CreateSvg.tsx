interface GetSvgWithPathProps {
  paths: { d: string }[];
  strokeWidth: number;
  size: string;
  color?: string;
}

export const CreateSvgV3 = ({
  paths,
  strokeWidth,
  size,
  color = "currentColor",
}: GetSvgWithPathProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={strokeWidth}
    stroke={color}
    className={`${size} sm:inline hidden`}
  >
    {paths.map(({ d }, i) => {
      return <path key={i} strokeLinecap="round" strokeLinejoin="round" d={d} />;
    })}
  </svg>
);
