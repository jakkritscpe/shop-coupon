import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const user = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // ✅ Block ถ้า user ไม่มีสิทธิ์
  if (pathname.startsWith("/admin") && (!user || user.role !== "admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ ตรวจสอบเฉพาะ path ที่อนุญาตไว้
  const allowedPaths = [
    "/admin/edit/contact",
    "/admin/edit/about",
    "/admin/edit/terms",
    "/admin/edit/privacy",
    "/admin/edit/follow",
    "/admin/setting",
  ];

  const isAllowed = allowedPaths.some((path) => pathname.startsWith(path));
  if (pathname.startsWith("/admin") && !isAllowed) {
    return NextResponse.rewrite(new URL("/not-found", request.url)); // 👈 ตรงนี้สำคัญ
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};