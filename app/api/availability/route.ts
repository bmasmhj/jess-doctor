import { NextResponse } from "next/server";
import { getAvailability } from "@/lib/googleCalendar";

export const revalidate = 300;

export async function GET() {
  const days = await getAvailability();
  return NextResponse.json({ days });
}
