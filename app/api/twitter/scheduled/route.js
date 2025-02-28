import { NextResponse } from "next/server";
import { scheduledFetch } from "@/utils/twitter-scheduler";

export async function POST(request) {
  try {
    const { query } = await request.json();
    const data = await scheduledFetch(query);

    if (!data) {
      return NextResponse.json(
        { error: "Failed to fetch scheduled tweets" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data,
      _metadata: {
        scheduled: true,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
