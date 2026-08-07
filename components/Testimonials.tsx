type Testimonial = {
  id: string;
  clinicName: string;
  authorName: string;
  quote: string;
  rating: number;
};

export default function Testimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-mint py-20">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-teal-deep">
          From clinics I&apos;ve covered
        </p>
        <h2 className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl">
          What practice managers say
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="rounded-2xl border border-line/60 bg-cream px-6 py-6"
            >
              <p className="font-mono-data text-xs text-coral">
                {t.rating}/5
              </p>
              <blockquote className="mt-3 font-display text-lg italic leading-snug text-ink">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm text-ink/60">
                {t.authorName} — {t.clinicName}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
