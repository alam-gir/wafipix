"use client";
import Button2 from "@/components/global/buttons/button2";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Check, X } from "lucide-react";
import { FC, useState } from "react";

interface ConfirmationProps {
  children: React.ReactNode;
  header?: string;
  description?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

const Confirmation: FC<ConfirmationProps> = ({
  children,
  header,
  description,
  onConfirm,
  onCancel,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <div className="space-y-12">
          <div>
            <h1 className=" text-lg lg:text-xl font-semibold tracking-wide text-primary">
              {header ? header : "Are you confirm ?"}
            </h1>
            <p className="text-primary/80 tracking-wide">
              {description
                ? description
                : "If you confirm, then click on Yes button."}
            </p>
          </div>
          <div className="flex gap-6 w-full justify-end">
            <Button2
              onClick={() => {
                onConfirm();
                setOpen(false);
              }}
              title="Yes"
              icon={<Check />}
            />
            <Button2
              variant={"outline"}
              onClick={() => {
                if (onCancel) onCancel();

                setOpen(false);
              }}
              title="No"
              icon={<X />}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Confirmation;
