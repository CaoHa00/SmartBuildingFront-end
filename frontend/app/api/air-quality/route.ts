import { NextResponse } from "next/server";
import { fetchAirQualityData } from "@/lib/air-quality"; // Ensure correct path

export async function GET() {
  try {
    const airQualityData = await fetchAirQualityData();

    if (!airQualityData) {
      return NextResponse.json(
        { error: "Failed to fetch air quality data" },
        { status: 500 }
      );
    }

    return NextResponse.json(airQualityData);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
