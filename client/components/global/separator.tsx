import { cn } from "@/lib/utils";
import { FC } from "react";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const Separator: FC<SeparatorProps> = ({ className }) => {

    return <div className={cn("w-screen h-[100px]", className)}/>;
};


export default Separator;