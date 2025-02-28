import { NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";
import { cacheData } from "@/utils/cache";

// Initialize Twitter client
const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "#AFGvsENG";
    const count = parseInt(searchParams.get("count") || "5");

    // Check cache first
    const cacheKey = `twitter-${query}-${count}`;
    const cachedData = cacheData.get(cacheKey);
    if (cachedData) {
      return NextResponse.json({
        data: cachedData,
        _metadata: {
          cached: true,
          timestamp: new Date().toISOString(),
        },
      });
    }

    // Fetch fresh data
    const response = await twitterClient.v2.search(query, {
      "tweet.fields": ["created_at", "public_metrics", "author_id", "text"],
      max_results: count,
    });

    // Cache the results
    cacheData.set(cacheKey, response.data);

    return NextResponse.json({
      data: response.data,
      _metadata: {
        cached: false,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Twitter API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch tweets" },
      { status: 500 }
    );
  }
}
