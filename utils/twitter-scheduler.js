import { TwitterApi } from "twitter-api-v2";
import { cacheData } from "./cache";

const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

export async function scheduledFetch(query = "#tech") {
  try {
    const response = await twitterClient.v2.search(query, {
      "tweet.fields": ["created_at", "public_metrics", "author_id"],
      max_results: 10,
    });

    const cacheKey = `twitter-${query}-10`;
    cacheData.set(cacheKey, response.data);

    return response.data;
  } catch (error) {
    console.error("Scheduled fetch error:", error);
    return null;
  }
}

// You can call this function from your pages/components when needed
// or set up a cron job using Vercel Cron Jobs or similar service
