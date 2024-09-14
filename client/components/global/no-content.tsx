import { cn } from "@/lib/utils";

const NoContentField = (message?: string, option?: { minHeight?: number }) => (
  <div className={cn("w-full flex items-center justify-center", {
    "min-h-[50vh]": !option?.minHeight,
    [`min-h-${option?.minHeight}`]: option
  })}>
    <p className="text-lg text-primary/80 font-semibold tracking-wide">
      {message || "No content found!"}
    </p>
  </div>
);

export default NoContentField;
