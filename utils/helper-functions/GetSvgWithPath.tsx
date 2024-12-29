export const GetSvgWithPath = (path: string, strokeWidth: number) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={strokeWidth}
    stroke="currentColor"
    className={`${size} sm:inline hidden`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);
