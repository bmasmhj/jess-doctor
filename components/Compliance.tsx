import Image from "next/image";

const rows = (content: Record<string, string>) => [
  { label: "AHPRA registration", value: content.compliance_ahpra },
  { label: "Working with children", value: content.compliance_wwcc },
  { label: "Radiation licence", value: content.compliance_radiation },
  { label: "Professional indemnity", value: content.compliance_insurance },
  { label: "First aid / CPR", value: content.compliance_first_aid },
];

export default function Compliance({
  content,
  siteName,
}: {
  content: Record<string, string>;
  siteName: string;
}) {
  return (
    <section id="compliance" className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
          Ready to walk in: compliance &amp; credentials
        </h2>
        <p className="mt-3 max-w-xl text-ink/70">
          Every credential a practice manager needs to sight before rostering
          me on — kept current and ready to verify.
        </p>

        <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="order-1 flex justify-center lg:order-2 lg:justify-start">
            <div className="relative w-full max-w-sm rotate-[-1.5deg] rounded-3xl border border-line bg-white shadow-[0_20px_45px_-25px_rgba(31,42,40,0.45)]">
              <div
                aria-hidden
                className="absolute left-1/2 top-3 h-3 w-3 -translate-x-1/2 rounded-full bg-cream ring-4 ring-line/40"
              />
              <div className="rounded-t-3xl bg-teal-deep px-6 pb-4 pt-8 text-cream">
                <p className="text-[11px] uppercase tracking-[0.25em] text-cream/70">
                  Locum credential card
                </p>
                <p className="mt-1 font-display text-xl">{siteName}</p>
                <p className="text-xs text-cream/70">Oral Health Therapist</p>
              </div>
              <dl className="divide-y divide-line/60 px-6 py-4">
                {rows(content).map((row) => (
                  <div key={row.label} className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="text-xs text-ink/60">{row.label}</dt>
                    <dd className="font-mono-data text-right text-sm text-ink">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="flex items-center justify-between rounded-b-3xl border-t border-line/60 bg-mint px-6 py-3">
                <span className="text-xs font-medium text-teal-deep">Status</span>
                <span className="rounded-full bg-teal-deep px-3 py-1 text-[11px] font-medium text-cream">
                  Current
                </span>
              </div>
            </div>
          </div>
          <div className="relative order-2 mx-auto h-96 w-full max-w-md sm:h-[28rem] lg:mx-0 lg:h-[32rem]">
            <Image
              src="/side-doctor.png"
              alt={`${siteName} reviewing patient notes`}
              fill
              sizes="(min-width: 1024px) 448px, 384px"
              className="object-contain object-bottom"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
