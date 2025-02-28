import { cacheData } from "./cache";

export async function fetchTwitterData(query, count = 10) {
  const cacheKey = `twitter-${query}-${count}`;

  // Check cache first
  const cachedData = cacheData.get(cacheKey);
  if (cachedData) {
    console.log("Returning cached data for:", cacheKey);
    return cachedData;
  }

  const url = `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(
    query
  )}&max_results=${count}&tweet.fields=created_at,public_metrics`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Twitter API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Cache the successful response
    cacheData.set(cacheKey, data);

    return data;
  } catch (error) {
    console.error("Twitter API Error:", error);
    throw error;
  }
}
