import { cn } from "@/lib/utils";

const PrimaryCardHeader = ({
  children,
  ref,
  className,
}: {
  children: React.ReactNode;
  ref?: React.Ref<HTMLHeadingElement>;
  className?: string;
}) => {
  return (
    <h1
      ref={ref}
      className={cn(
        "text-sm sm:text-md justify-start text-tertiary-800 display flex flex-row items-center gap-2",
        className
      )}
    >
      {children}
    </h1>
  );
};

export default PrimaryCardHeader;
