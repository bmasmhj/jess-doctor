import Image from "next/image";

export default function Hero({
  siteName,
  tagline,
  region,
}: {
  siteName: string;
  tagline: string;
  region: string;
}) {
  return (
    <section className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80 lg:mx-0">
        <div
          aria-hidden
          className="absolute inset-0 -rotate-6 rounded-[2.5rem] bg-teal"
        />
        <div
          aria-hidden
          className="absolute inset-0 rotate-6 rounded-[2.5rem] bg-mint"
        />
        <Image
          src="/front-doctor.png"
          alt={`${siteName}, Oral Health Therapist`}
          fill
          sizes="(min-width: 640px) 320px, 288px"
          priority
          className="relative object-contain object-bottom scale-110"
        />
      </div>

      <div>
        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
          {siteName}
          <span className="block text-teal">Oral Health Therapist</span>
        </h1>
        <p className="mt-6 max-w-lg text-base text-ink/70 sm:text-lg">
          {tagline.replace("[YOUR REGION]", region)}
        </p>

        <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium">
          <span className="flex items-center gap-1.5 rounded-full bg-teal-deep px-4 py-2 text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
            Available for locum &amp; casual relief
          </span>
          <span className="rounded-full bg-mint px-4 py-2 text-ink">Full adult scope</span>
          <span className="rounded-full bg-mint px-4 py-2 text-ink">AHPRA registered</span>
          <span className="rounded-full bg-mint px-4 py-2 text-ink">WWCC &amp; insured</span>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#book"
            className="rounded-full bg-teal-deep px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
          >
            Check availability
          </a>
          <a
            href="#book"
            className="rounded-full border-2 border-teal-deep px-6 py-3 text-sm font-semibold text-teal-deep transition-colors hover:bg-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
          >
            Request a booking
          </a>
        </div>
      </div>
    </section>
  );
}
