import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FC } from "react";
import reponseIcon from "@/public/icon/response.svg"
import Image from "next/image";
import Button2 from "@/components/global/buttons/button2";

interface ContactMessageSentDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

const ContactMessageSentDialog: FC<ContactMessageSentDialogProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-96 p-8 space-y-4">
        <h1 className="text-xl lg:text-3xl text-accent3 font-semibold mb-2">
          Assalamualaikum,
        </h1>

        <Image src={reponseIcon} alt="Response soon image" />

        <p className="text-xl text-accent3 font-semibold">
          We will respond you as soon as possible. Just wait a bit.
        </p>

        <h1 className="text-lg text-primary">
          Jazakumullah khair form contact us.{" "}
        </h1>

        <Button2 href="/" title="Go to home" />
      </DialogContent>
    </Dialog>
  );
};

export default ContactMessageSentDialog;
