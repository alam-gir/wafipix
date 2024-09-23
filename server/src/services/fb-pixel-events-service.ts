import { Request } from "express";
import fbConversionsApi from "../lib/fb-conversions-api";

export const fbPixelEventsService = {
    contactEvent: async (name: string, email: string, phone: string, sourceOfCustomer: string, zip: string, isSubscribe: boolean, request: Request) => {
        return fbConversionsApi.trackContactEvent(name, email, phone, zip, sourceOfCustomer, isSubscribe, request);
    },

    pageViewEvent: async (pageName: string, pageLink: string, request: Request) => {
        return fbConversionsApi.trackPageViewEvent(pageName, pageLink, request);
    }
}