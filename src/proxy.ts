import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const KF_ONLY_ROUTES = ["/dashboard", "/kf", "/toolbox", "/other-studies", "/give-a-gift", "/search", "/calendar"];

const ADMIN_ONLY_ROUTES = ["/admin"];

const MEMBER_ROUTES = [...KF_ONLY_ROUTES, "/nhg", ...ADMIN_ONLY_ROUTES];

const NHG_PAID_ROUTES = ["/nhg"];

function isProtected(pathname: string, routes: string[]) {
  return routes.some((r) => pathname === r || pathname.startsWith(r + "/"));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

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

  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const needsProfile =
    isProtected(pathname, KF_ONLY_ROUTES) ||
    isProtected(pathname, NHG_PAID_ROUTES) ||
    isProtected(pathname, ADMIN_ONLY_ROUTES);

  if (needsProfile) {
    const { data: profile } = await supabase
      .from("users")
      .select("tier, active, nhg_paid, kf_invited, kf_registered_year")
      .eq("id", user.id)
      .single();

    if (!profile || !profile.active) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isProtected(pathname, ADMIN_ONLY_ROUTES) && profile.tier !== "admin") {
      const home = profile.tier === "nhg" ? "/nhg" : "/dashboard";
      return NextResponse.redirect(new URL(home, request.url));
    }

    if (isProtected(pathname, KF_ONLY_ROUTES) && profile.tier === "nhg") {
      if (profile.kf_invited && pathname === "/kf/register") {
        // Allow invited NHG users to access the KF registration page
      } else if (profile.kf_invited) {
        return NextResponse.redirect(new URL("/kf/register", request.url));
      } else {
        return NextResponse.redirect(new URL("/nhg", request.url));
      }
    }

    const currentYear = new Date().getFullYear();
    if (
      isProtected(pathname, KF_ONLY_ROUTES) &&
      profile.tier === "kf" &&
      pathname !== "/kf/register" &&
      profile.kf_invited &&
      profile.kf_registered_year !== currentYear
    ) {
      return NextResponse.redirect(new URL("/kf/register", request.url));
    }

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
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:jpg|jpeg|png|gif|webp|svg|ico|mov|mp4|pdf|docx|woff2?|css|js)).*)",
  ],
};
