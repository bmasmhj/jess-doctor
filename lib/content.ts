import { prisma } from "@/lib/prisma";

export const DEFAULT_CONTENT: Record<string, string> = {
  site_name: "Jaspreet Kaur",
  site_tagline: "Independent Oral Health Therapist (OHT) | [YOUR REGION] Locum & Casual Relief Services",
  region: "[YOUR REGION]",
  contact_email: "jaspreet@example.com",
  linkedin_url: "https://www.linkedin.com/in/[your-linkedin]",
  services_list:
    "Full adult scope of practice (therapy & hygiene)\nRestorative care\nInvisalign / clear aligner attachment maintenance\nIn-chair and take-home whitening (Zoom whitening etc.)\nNitrous oxide sedation support\nPreventative care and oral hygiene instruction",
  compliance_ahpra: "[AHPRA REGISTRATION NUMBER]",
  compliance_wwcc: "[WORKING WITH CHILDREN CHECK NUMBER]",
  compliance_radiation: "[RADIATION LICENCE NUMBER]",
  compliance_insurance: "[PROFESSIONAL INDEMNITY INSURANCE PROVIDER & POLICY NUMBER]",
  compliance_first_aid: "[FIRST AID / CPR CERTIFICATION EXPIRY]",
  rate_single_day: "$100/hr",
  rate_week_plus: "$80/hr (for bookings of 7+ consecutive days)",
  min_booking_duration: "Minimum 4-hour booking",
  travel_radius: "[TRAVEL RADIUS, e.g. 30km from CBD]",
  seo_title: "Jaspreet Kaur | Independent Oral Health Therapist | Locum & Casual Relief",
  seo_description:
    "Jaspreet Kaur is an AHPRA-registered Oral Health Therapist available for locum and casual relief shifts. View live availability and book directly.",
  seo_keywords: "oral health therapist, OHT locum, dental locum, casual relief dental, dental hygienist for hire",
  og_image_url: "/og-placeholder.png",
  favicon_url: "/favicon.ico",
};

export async function getContent(): Promise<Record<string, string>> {
  try {
    const rows = await prisma.siteContent.findMany();
    const fromDb = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    return { ...DEFAULT_CONTENT, ...fromDb };
  } catch {
    return DEFAULT_CONTENT;
  }
}
