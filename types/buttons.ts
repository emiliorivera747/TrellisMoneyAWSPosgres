export interface PrimaryButtonProps {
  bgColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  text?: string;
  withLinearGradient?: boolean;
  bgFrom?: string;
  bgTo?: string;
  hoverBgFrom?: string;
  hoverBgTo?: string;
  actionFunction: () => void;
  px?: string;
  py?: string;
  h?: string;
  w?: string;
  rounded?: string;
}

export interface SubmitButtonProps {
  ref: React.ButtonHTMLAttributes<HTMLButtonElement>;
  className?: string;
  bgColor?: string;
  textColor?: string;
  hoverBgColor?: string;
  text?: string;
  withLinearGradient?: boolean;
  bgFrom?: string;
  bgTo?: string;
  hoverBgFrom?: string;
  hoverBgTo?: string;
  w?: string;
  px?: string;
  py?: string;
  h?: string;
  rounded?: string;
}
