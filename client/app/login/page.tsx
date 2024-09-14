import PageHeader from "@/components/global/page-header";
import Separator from "@/components/global/separator";
import { FC } from "react";
import LoginWithGoogleButton from "../(private)/_components/auth/login-with-google-button";
import WidthWrapper from "@/components/global/width-wrapper";

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
  return (
    <WidthWrapper>
      <div>
        <PageHeader
          header="Login with your account"
          subHeader="Login to access a authenticate features."
        />
        <Separator />
        <LoginWithGoogleButton />
        <Separator />
      </div>
    </WidthWrapper>
  );
};

export default Login;
