import { NextRequest, NextResponse } from "next/server"

export function proxy(req: NextRequest) {

  const token =
    req.cookies.get("token")

  const isDashboardRoute =
    req.nextUrl.pathname.startsWith(
      "/dashboard"
    )

  //////////////////////////////////////////////////////
  // PROTECT DASHBOARD
  //////////////////////////////////////////////////////

  if (
    isDashboardRoute &&
    !token
  ) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    )
  }

  return NextResponse.next()
}

//////////////////////////////////////////////////////
// MATCHER
//////////////////////////////////////////////////////

export const config = {
  matcher: ["/dashboard/:path*"],
}