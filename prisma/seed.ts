import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

const defaultContent: Record<string, string> = {
  site_name: "Jaspreet Kaur",
  site_tagline: "Independent Oral Health Therapist (OHT) | [YOUR REGION] Locum & Casual Relief Services",
  region: "[YOUR REGION]",
  contact_email: "jaspreet@example.com",
  linkedin_url: "https://www.linkedin.com/in/[your-linkedin]",

  services_list: [
    "Full adult scope of practice (therapy & hygiene)",
    "Restorative care",
    "Invisalign / clear aligner attachment maintenance",
    "In-chair and take-home whitening (Zoom whitening etc.)",
    "Nitrous oxide sedation support",
    "Preventative care and oral hygiene instruction",
  ].join("\n"),

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

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "jaspreet@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, passwordHash },
  });

  for (const [key, value] of Object.entries(defaultContent)) {
    await prisma.siteContent.upsert({
      where: { key },
      update: {},
      create: { key, value },
    });
  }

  console.log(`Seeded admin user (${adminEmail}) and ${Object.keys(defaultContent).length} content keys.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
