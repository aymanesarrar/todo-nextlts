import { NextRequest } from "next/server";
import { verifySession } from "./lib/session";

export async function middleware(request: NextRequest) {
  const protectedRoutes = ["/todos"];
  const currentUser = await verifySession();
  if (!currentUser && protectedRoutes.includes(request.nextUrl.pathname)) {
    return Response.redirect(new URL("/signup", request.url));
  }
  if (currentUser && ["/signup", "/login"].includes(request.nextUrl.pathname)) {
    return Response.redirect(new URL("/todos", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
