import type { Metadata, Viewport } from "next";
import { Sora, Caveat, Work_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { getContent } from "@/lib/content";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const workSans = Work_Sans({
  variable: "--font-worksans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jbMono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return {
    metadataBase: new URL(process.env.NEXTAUTH_URL ?? "http://localhost:3000"),
    title: content.seo_title,
    description: content.seo_description,
    keywords: content.seo_keywords,
    icons: { icon: content.favicon_url },
    openGraph: {
      title: content.seo_title,
      description: content.seo_description,
      images: [content.og_image_url],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo_title,
      description: content.seo_description,
      images: [content.og_image_url],
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const content = await getContent();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: content.site_name,
    jobTitle: "Oral Health Therapist",
    email: content.contact_email,
    url: content.linkedin_url,
    address: {
      "@type": "PostalAddress",
      addressRegion: content.region,
    },
    knowsAbout: content.services_list.split("\n"),
  };

  return (
    <html
      lang="en"
      className={`${sora.variable} ${caveat.variable} ${workSans.variable} ${jbMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
