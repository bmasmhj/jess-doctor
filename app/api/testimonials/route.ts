import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const testimonialSchema = z.object({
  clinicName: z.string().trim().min(1).max(200),
  authorName: z.string().trim().min(1).max(200),
  quote: z.string().trim().min(1).max(2000),
  rating: z.number().int().min(1).max(5).default(5),
  approved: z.boolean().optional().default(false),
});

export async function GET(request: NextRequest) {
  const session = await auth();
  const url = new URL(request.url);
  const all = url.searchParams.get("all") === "1";

  const testimonials = await prisma.testimonial.findMany({
    where: all && session ? {} : { approved: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ testimonials });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = testimonialSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const testimonial = await prisma.testimonial.create({ data: parsed.data });
  return NextResponse.json({ testimonial }, { status: 201 });
}
