export type TEmailForm = {
    name: string;
    email: string;
    phone?: string;
    zipCode: string;
    sourceOfCustomer: string;
    message: string;
    isSubscribe: boolean;
  }

import { request } from "../axios"

export const sendContactMail = async (data: TEmailForm) => {
        return await request({
            url: "/email/contact",
            method: 'POST',
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
}


