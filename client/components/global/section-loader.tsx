import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { FC } from "react";

interface SectionLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
    iconClassName?: string
}

const SectionLoader: FC<SectionLoaderProps> = ({iconClassName, className,...props}) => {
  return (
    <div className={cn("min-h-full w-full flex items-center justify-center", className)}>
      <Loader2 className={cn("animate-spin h-8 w-8 text-accent3", iconClassName)} />
    </div>
  );
};

export default SectionLoader;
