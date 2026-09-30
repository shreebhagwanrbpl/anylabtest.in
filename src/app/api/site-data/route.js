import { NextResponse } from "next/server";
import { fetchLiveSiteDataFromVPS } from "@/lib/admin-api";
import { getWebsiteId, normalizeDomainId } from "@/lib/catalog-utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const hostHeader = req.headers.get("x-forwarded-host") || req.headers.get("host") || "";
  const requestedWebsiteId = searchParams.get("websiteId");
  
  const websiteId = requestedWebsiteId
    ? normalizeDomainId(requestedWebsiteId)
    : getWebsiteId(hostHeader);

  const page = searchParams.get("page") || searchParams.get("type") || "home";
  const district = searchParams.get("district") || "";

  try {
    const data = await fetchLiveSiteDataFromVPS(websiteId, page, { district });

    if (page === "districts") {
      return NextResponse.json(
        { districts: Array.isArray(data) ? data : [] },
        {
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
            Pragma: "no-cache",
          },
        }
      );
    }

    return NextResponse.json(data || {}, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        Pragma: "no-cache",
      },
    });
  } catch (e) {
    console.error("[api/site-data] GET error:", e);
    return NextResponse.json(
      { success: false, error: e.message },
      { status: 500 }
    );
  }
}
