import { NextResponse } from "next/server";
import { postLiveFirestore } from "@/lib/admin-api";
import { getWebsiteId, normalizeDomainId } from "@/lib/catalog-utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req) {
  try {
    const body = await req.json();
    const hostHeader = req.headers.get("x-forwarded-host") || req.headers.get("host") || "";
    
    const websiteId = body.websiteId
      ? normalizeDomainId(body.websiteId)
      : getWebsiteId(hostHeader);

    const firestorePath = `websitesQueries/${websiteId}/contactQueries`;
    
    const payload = {
      ...body,
      websiteId,
      createdAt: body.createdAt || new Date().toISOString(),
    };

    const responseData = await postLiveFirestore(firestorePath, payload, "add");

    return NextResponse.json({
      success: true,
      data: responseData,
    });
  } catch (e) {
    console.error("[api/contact-query] Error:", e);
    return NextResponse.json(
      { success: false, error: e.message || "Failed to submit contact query" },
      { status: 500 }
    );
  }
}
