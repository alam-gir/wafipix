import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/async-handler";
import { sendEmail } from "../../lib/nodemailer";
import { ApiError } from "../../lib/custom-api-error-class";
import { fbPixelEventsService } from "../../services/fb-pixel-events-service";

export const emailController = {
  sendContactMail: asyncHandler(async (req: Request, res: Response) => {
    const { fullName, companyName, email, phone, sourceOfCustomer, projectBudget, currency, projectDetails, isSubscribe } =
      req.body as {
        fullName: string;
        companyName?: string;
        email: string;
        phone?: string;
        sourceOfCustomer: string;
        projectBudget: number;
        currency: "USD" | "BDT";
        projectDetails: string;
        isSubscribe: boolean;
      }
    ;

    if (!fullName) throw new ApiError("Name is required!", 404);
    if (!email) throw new ApiError("Email is required!", 404);
    if (!projectBudget) throw new ApiError("Project details is required!", 404);
    if (!projectDetails) throw new ApiError("Project details is required!", 404);
    if (!currency) throw new ApiError("Currency is required!", 404);

    const emailText = getEmailTextOfContact(
      fullName,
      companyName || "Not given",
      email,
      phone || "Not given",
      sourceOfCustomer,
      projectBudget,
      currency,
      projectDetails,
      isSubscribe
    );

    const emailPromise = sendEmail({
      subject: "Contact email form wafipix.",
      to: process.env.CONTACT_MAIL!,
      text: emailText,
    });

    const contactEventPromise = fbPixelEventsService.contactEvent(
      fullName,
      email,
      phone || "",
      sourceOfCustomer,
      "",
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

function getEmailTextOfContact (
  name: string,
  company: string,
  email: string,
  phone: string,
  source: string,
  projectBudget: number,
  currency: string,
  projectDetails: string,
  isSubscribe?: boolean
) {
  return `
  Client \n
  --------------------------------------------\n
  name: ${name} \n
  company name: ${company} \n
  email: ${email} \n
  phone: ${phone} \n\n

  Project \n
  --------------------------------------------\n
  project budget : ${projectBudget} ${currency} \n
  project detials : \n
  ${projectDetails} \n\n

  Others \n
  --------------------------------------------\n
  source of customer: ${source}\n
  subscribe newsletter: ${isSubscribe ? "Yes" : "No"}\n\n\n

  This message is from wafipix.com sent by ${name}.
  `;
}
