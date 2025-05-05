interface GetSvgWithPathProps {
  path: string;
  strokeWidth: number;
  size: string;
  color?: string;
}

export const GetSvgV2 = ({ path, strokeWidth, size, color = "currentColor" }: GetSvgWithPathProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={strokeWidth}
    stroke={color}
    className={`${size} sm:inline hidden`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);