import { NextResponse } from "next/server";
import { fetchLiveCatalogFromVPS } from "@/lib/admin-api";
import { getWebsiteId, normalizeDomainId } from "@/lib/catalog-utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const hostHeader = req.headers.get("x-forwarded-host") || req.headers.get("host") || "";
    const requestedWebsiteId = searchParams.get("websiteId");
    
    const websiteId = requestedWebsiteId
      ? normalizeDomainId(requestedWebsiteId)
      : getWebsiteId(hostHeader);

    const products = await fetchLiveCatalogFromVPS(websiteId);

    return NextResponse.json(
      {
        success: true,
        websiteId,
        products,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
          Pragma: "no-cache",
        },
      }
    );
  } catch (e) {
    console.error("[api/catalog] GET error:", e);
    return NextResponse.json(
      { success: false, error: e.message, products: [] },
      { status: 500 }
    );
  }
}
