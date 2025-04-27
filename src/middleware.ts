import { getToken } from "next-auth/jwt";
import { NextRequest,NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const user = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log('user', user);

  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/admin') &&
    (!user || user.role !== 'admin')
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};