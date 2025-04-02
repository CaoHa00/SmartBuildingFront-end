import { NextResponse } from "next/server";
import { fetchWeatherData } from "@/lib/weather"; // Ensure correct path

export async function GET() {
  try {
    const weatherData = await fetchWeatherData();

    if (!weatherData) {
      return NextResponse.json(
        { error: "Failed to fetch weather data" },
        { status: 500 }
      );
    }
    return NextResponse.json(weatherData);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
