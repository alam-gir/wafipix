import { Request } from "express";
import { Content, CustomData, EventRequest, ServerEvent, UserData } from "facebook-nodejs-business-sdk";
import shortid from "shortid";

class FBConversionsAPI {
  private accessToken: string = process.env.FB_CONVERSIONS_API_ACCESS_TOKEN!;
  private pixelId: string = process.env.FB_CONVERSIONS_API_PIXEL_ID!;

  public async trackContactEvent(
    name: string,
    email: string,
    phone: string,
    zip: string,
    sourceOfCustomer: string,
    isSubscribe: boolean,
    request: Request
  ) {

    const userData = new UserData()
      .setFirstName(name)
      .setEmail(email)
      .setPhone(phone)
      .setClientIpAddress(request.ip || "0.0.0.0")
      .setZip(zip);

    const customData = new CustomData().setCustomProperties({
      sourceOfCustomer,
      isSubscribe,
    });

    return await this.sendEvent("Contact", userData, customData, request.url);
  }

  public async trackPageViewEvent(
    pageName: string,
    pageLink: string,
    request: Request
  ) {
    const userData = new UserData().setClientIpAddress(request.ip || "0.0.0.0");
    const customData = new CustomData().setCustomProperties({
        pageName,
        pageLink
    });

    return await this.sendEvent("PageView", userData, customData, request.url);
  }

  private serverEvent(
    eventName: string,
    userData: UserData,
    customData: CustomData,
    sourceUrl: string
  ) {
    return new ServerEvent()
      .setEventName(eventName)
      .setUserData(userData)
      .setCustomData(customData)
      .setEventId(shortid.generate())
      .setEventTime(Math.floor(Date.now() / 1000))
      .setEventSourceUrl(sourceUrl)
      .setActionSource("website");
  }

  private eventData(
    eventName: string,
    userData: UserData,
    customData: CustomData,
    sourceUrl: string
  ) {
    return this.serverEvent(eventName, userData, customData, sourceUrl);
  }

  private eventRequest(
    eventName: string,
    userData: UserData,
    customData: CustomData,
    sourceUrl: string
  ) {
    return new EventRequest(this.accessToken, this.pixelId).setEvents([
      this.eventData(eventName, userData, customData, sourceUrl),
    ]);
  }

  private async sendEvent(
    eventName: string,
    userData: UserData,
    customData: CustomData,
    sourceUrl: string
  ) {
    return this.eventRequest(eventName, userData, customData, sourceUrl)
      .execute()
      .then(ev =>{
        // console. event name
        return ev;
      })
      .catch((error) => {
        console.error("Error sending event: ", error);
      });
  }
}


export default new FBConversionsAPI();