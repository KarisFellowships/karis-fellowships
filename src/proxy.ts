import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Routes that require KF tier (tier = 'kf' or 'admin')
const KF_ONLY_ROUTES = ["/dashboard", "/kf", "/toolbox", "/other-studies", "/give-a-gift"];

// Routes that require any membership (nhg, kf, or admin)
const MEMBER_ROUTES = ["/dashboard", "/nhg", "/kf", "/toolbox", "/other-studies", "/calendar", "/admin", "/give-a-gift"];

// Routes that require NHG payment
const NHG_PAID_ROUTES = ["/nhg"];

function isProtected(pathname: string, routes: string[]) {
  return routes.some((r) => pathname === r || pathname.startsWith(r + "/"));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only intercept protected routes
  if (!isProtected(pathname, MEMBER_ROUTES)) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // No session -- redirect to login
  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Fetch profile once for tier and payment checks
  const needsProfile = isProtected(pathname, KF_ONLY_ROUTES) || isProtected(pathname, NHG_PAID_ROUTES);

  if (needsProfile) {
    const { data: profile } = await supabase
      .from("users")
      .select("tier, active, nhg_paid")
      .eq("id", user.id)
      .single();

    if (!profile) {
      return response;
    }

    if (!profile.active) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // KF-only route checks
    if (isProtected(pathname, KF_ONLY_ROUTES) && profile.tier === "nhg") {
      return NextResponse.redirect(new URL("/nhg", request.url));
    }

    // NHG payment gate — require $30 before accessing NHG content
    if (
      isProtected(pathname, NHG_PAID_ROUTES) &&
      pathname !== "/nhg/payment-required" &&
      profile.tier === "nhg" &&
      !profile.nhg_paid
    ) {
      return NextResponse.redirect(new URL("/nhg/payment-required", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|png|gif|webp|svg|ico|mov|mp4)).*)",
  ],
};
