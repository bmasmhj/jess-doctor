import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const bookingSchema = z.object({
  practiceName: z.string().trim().min(1).max(200),
  contactName: z.string().trim().min(1).max(200),
  email: z.string().trim().email(),
  phone: z.string().trim().min(1).max(50),
  software: z.string().trim().max(200).optional().nullable(),
  requestedDates: z.string().trim().min(1).max(500),
  message: z.string().trim().max(2000).optional().nullable(),
});

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = bookingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const booking = await prisma.bookingRequest.create({
    data: {
      ...parsed.data,
      software: parsed.data.software ?? undefined,
      message: parsed.data.message ?? undefined,
    },
  });

  return NextResponse.json({ id: booking.id }, { status: 201 });
}

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookings = await prisma.bookingRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ bookings });
}
