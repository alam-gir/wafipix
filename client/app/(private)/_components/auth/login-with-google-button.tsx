import { signInAction } from "@/actions";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { FaGoogle } from "react-icons/fa";

interface LoginWithGoogleButtonProps {}

const LoginWithGoogleButton: FC<LoginWithGoogleButtonProps> = ({}) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <form
        className={cn("text-primary-foreground text-xl font-normal")}
        action={signInAction}
      >
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <span>
            <FaGoogle className="inline-block mr-2" />
          </span>
          <span>Login with Google</span>
        </button>
      </form>
    </div>
  );
};

export default LoginWithGoogleButton;
