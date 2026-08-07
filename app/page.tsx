import { getContent } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ScopeServices from "@/components/ScopeServices";
import Compliance from "@/components/Compliance";
import Rates from "@/components/Rates";
import Testimonials from "@/components/Testimonials";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";

export default async function Home() {
  const content = await getContent();

  const testimonials = await prisma.testimonial
    .findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    })
    .catch(() => []);

  const services = content.services_list.split("\n").filter(Boolean);

  return (
    <>
      <Nav siteName={content.site_name} />
      <main className="flex-1">
        <Hero
          siteName={content.site_name}
          tagline={content.site_tagline}
          region={content.region}
        />
        <ScopeServices services={services} />
        <Compliance content={content} siteName={content.site_name} />
        <Rates content={content} />
        <Testimonials testimonials={testimonials} />
        <BookingSection />
      </main>
      <Footer
        siteName={content.site_name}
        contactEmail={content.contact_email}
        linkedinUrl={content.linkedin_url}
      />
    </>
  );
}
