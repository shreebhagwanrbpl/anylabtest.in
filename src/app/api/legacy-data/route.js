import { NextResponse } from "next/server";
import { fetchLiveCatalogFromVPS, fetchLiveSiteDataFromVPS } from "@/lib/admin-api";
import { getWebsiteId } from "@/lib/catalog-utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET(req) {
  const path = new URL(req.url).searchParams.get("path") || "";
  const websiteId = getWebsiteId();

  try {
    const parts = path.split("/");
    if (parts[0] === "websites" && parts[2] === "pages") {
      const page = parts[3] || "home";
      const data = await fetchLiveSiteDataFromVPS(websiteId, page);
      return NextResponse.json(
        { data: data || null },
        { headers: { "Cache-Control": "no-store" } }
      );
    }
    if (parts[0] === "websites" && parts[2] === "districts") {
      if (parts[3]) {
        const data = await fetchLiveSiteDataFromVPS(websiteId, "district", { district: parts[3] });
        return NextResponse.json(
          { data: data || null },
          { headers: { "Cache-Control": "no-store" } }
        );
      }
      const districts = await fetchLiveSiteDataFromVPS(websiteId, "districts");
      return NextResponse.json(
        { docs: (districts || []).map((x) => ({ id: x.id || x.slug, data: x })) },
        { headers: { "Cache-Control": "no-store" } }
      );
    }
    if (path.endsWith("/pages/products") || path.includes("products")) {
      const products = await fetchLiveCatalogFromVPS(websiteId);
      return NextResponse.json(
        { data: { products } },
        { headers: { "Cache-Control": "no-store" } }
      );
    }

    return NextResponse.json(
      { data: null, docs: [] },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
