// import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware() {
  // console.log("middleware: ");
  // console.log(req.url);
  // return NextResponse.redirect(new URL("/sign-in", req.url));
  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // if (req.nextUrl.pathname.startsWith("/admin")) {
  //   if (!token || token.role !== "admin") {
  //     return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};