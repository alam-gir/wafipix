import { auth } from "@/auth";

import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest, res: NextResponse) => {
  const { nextUrl } = req;
  const session = await auth();
  const user = session?.user;

  const isAdmin = user?.role.toLocaleLowerCase() === "admin";

  const loginPageUrl = new URL("/login", nextUrl.origin);

  const homePageUrl = new URL("/", nextUrl.origin);

  const dashboardPageUrl = new URL("/dashboard", nextUrl.origin);

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
