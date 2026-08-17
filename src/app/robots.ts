import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/kf",
          "/nhg",
          "/admin",
          "/toolbox",
          "/other-studies",
          "/give-a-gift",
          "/search",
          "/calendar",
          "/api",
        ],
      },
    ],
    sitemap: "https://karisfellowships.com/sitemap.xml",
  };
}
