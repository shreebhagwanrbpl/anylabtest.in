export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/*?*",
          "/admin",
          "/dashboard",
          "/_next/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/*?*"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/*?*"],
      },
    ],

    sitemap: "https://anylabtest.in/sitemap.xml",
  };
}