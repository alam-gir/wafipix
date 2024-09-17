import { signOutAction } from "@/actions";
import { cn } from "@/lib/utils";
import { LogOutIcon } from "lucide-react";
import { FC } from "react";

interface LogoutButtonProps {
  isCollapsed: boolean;
}

const LogoutButton: FC<LogoutButtonProps> = ({ isCollapsed }) => {
  return (
    <div className="group flex items-center p-4 hover:bg-accent3/80 rounded-md cursor-pointer transition-colors duration-150 ease-in-out">
        <form
          className={cn("text-accent3 font-medium group-hover:text-primary-foreground/80")}
          action={signOutAction}
        >
          <button className="flex gap-4">
            <span>
              <LogOutIcon />
            </span>
            {!isCollapsed && <span>Logout</span>}
          </button>
        </form>
    </div>
  );
};

export default LogoutButton;
