import { auth } from "@/auth";

import { NextRequest, NextResponse } from "next/server";
import { request } from "./lib/axios";

export const middleware = async (req: NextRequest, res: NextResponse) => {
  const { nextUrl } = req;

  const session = await auth();
  const user = session?.user;

  const isAdmin = user?.role.toLocaleLowerCase() === "admin";

  const loginPageUrl = new URL("/login", nextUrl.origin);

  const homePageUrl = new URL("/", nextUrl.origin);

  const dashboardPageUrl = new URL("/dashboard", nextUrl.origin);

  // SEND PAGE VIEW EVENT
  await sendPageViewEvent(req);

  if (nextUrl.pathname.includes("login")) {
    if (user) return NextResponse.redirect(dashboardPageUrl);

    NextResponse.next();
  }

  if (nextUrl.pathname.includes("dashboard")) {
    if (!user) return NextResponse.redirect(loginPageUrl);

    if (!isAdmin && user) return NextResponse.redirect(homePageUrl);

    NextResponse.next();
  }
};

async function sendPageViewEvent(req: NextRequest) {
  // SEND PAGE VIEW EVENT
  const { nextUrl } = req;

  const pageName = nextUrl.pathname.split("/").pop();
  const pageLink = nextUrl.href;

  if (!pageName || !pageLink) return;

  // ignore any page that is from next.js internal routing
  if (nextUrl.pathname.includes("login")) return;
  if (nextUrl.pathname.includes("_")) return;
  if (nextUrl.pathname.includes("api")) return;
  if (nextUrl.pathname.includes("favicon")) return;
  if (nextUrl.pathname.includes("vercel")) return;

  try {
    
    await request({
      method: "POST",
      url: "/fb-pixel-events/page-view",
      data: {
        pageName,
        pageLink,
      },
      withCredentials: true,
    });
  } catch (error) {
    console.log("Error from client event fetch : ", error);
  }
}
