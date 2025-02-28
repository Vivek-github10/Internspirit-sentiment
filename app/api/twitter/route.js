import { fetchTwitterData } from "@/utils/twitter";
import { cacheData } from "@/utils/cache";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const count = searchParams.get("count") || 10;

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 }
      );
    }

    const cacheKey = `twitter-${query}-${count}`;
    const isCached = cacheData.has(cacheKey);

    const twitterData = await fetchTwitterData(query, count);
    return NextResponse.json({
      ...twitterData,
      _metadata: {
        cached: isCached,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Twitter data" },
      { status: 500 }
    );
  }
}
