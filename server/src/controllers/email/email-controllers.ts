import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/async-handler";
import { sendEmail } from "../../lib/nodemailer";
import { ApiError } from "../../lib/custom-api-error-class";
import { fbPixelEventsService } from "../../services/fb-pixel-events-service";

export const emailController = {
  sendContactMail: asyncHandler(async (req: Request, res: Response) => {
    const { name, email, phone, message, sourceOfCustomer, zipCode, isSubscribe } =
      req.body as {
        name: string;
        email: string;
        phone: string;
        message: string;
        sourceOfCustomer: string;
        zipCode: string;
        isSubscribe: boolean;
      };

    if (!name) throw new ApiError("Name is required!", 404);
    if (!email) throw new ApiError("Email is required!", 404);
    if (!message) throw new ApiError("message is required!", 404);
    if (!zipCode) throw new ApiError("Zip code is required!", 404);

    const emailText = getContactEmailText(
      name,
      email,
      phone,
      message,
      sourceOfCustomer,
      zipCode,
      isSubscribe
    );

    const emailPromise = sendEmail({
      subject: "Contact email form wafipix.",
      to: process.env.CONTACT_MAIL!,
      text: emailText,
    });

    const contactEventPromise = fbPixelEventsService.contactEvent(
      name,
      email,
      phone,
      sourceOfCustomer,
      zipCode,
      isSubscribe,
      req
    );

    const [info, event] = await Promise.all([
      emailPromise,
      contactEventPromise,
    ]);

    res.status(200).json({ success: true, info });
  }),
};

function getContactEmailText(
  name: string,
  email: string,
  phone: string,
  message: string,
  sourceOfCustomer: string,
  zipCode: string,
  isSubscribe: boolean
) {
  return `
    Client Details \n
    --------------------------------------------\n
    name: ${name} \n
    email: ${email} \n
    phone: ${phone ? phone : "not given"} \n\n
    email: ${zipCode} \n

    Text message \n
    --------------------------------------------\n
    ${message} \n\n

    Others \n
    --------------------------------------------\n
    source of customer: ${sourceOfCustomer}\n
    subscribe newsletter: ${isSubscribe ? "Yes" : "No"}\n\n\n

    This message is from wafipix.com sent by ${name}.
    `;
}
