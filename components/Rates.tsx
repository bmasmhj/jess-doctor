export default function Rates({ content }: { content: Record<string, string> }) {
  const lines = [
    { label: "Single-day shift", value: content.rate_single_day },
    { label: "7+ consecutive days", value: content.rate_week_plus },
    { label: "Minimum booking", value: content.min_booking_duration },
    { label: "Travel radius", value: content.travel_radius },
  ];

  return (
    <section id="rates" className="bg-mint py-20">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
          Rates &amp; terms
        </h2>
        <p className="mt-2 text-ink/70">Transparent, upfront pricing.</p>

        <div className="mt-10 rounded-2xl border border-line/60 bg-cream px-6 py-6 sm:px-8">
          <ul>
            {lines.map((line) => (
              <li
                key={line.label}
                className="flex items-baseline gap-3 border-b border-line/40 py-4 last:border-none"
              >
                <span className="whitespace-nowrap text-sm text-ink/70">{line.label}</span>
                <span aria-hidden className="flex-1 border-b border-dotted border-ink/25" />
                <p className="font-mono-data text-sm font-medium text-ink">
                  {line.value}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-xs text-ink/50">
          Rates exclude GST where applicable. Confirm exact terms at time of booking.
        </p>
      </div>
    </section>
  );
}
