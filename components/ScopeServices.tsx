function IconTooth() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 4c-1.6 0-2.4 1-3.4 1s-2-.8-3.1-.4C3.9 5.2 3 7 3 9.5c0 2 .8 4.2 1.6 6.3.6 1.6 1.2 3.2 2.4 3.2.9 0 1-1.6 1.3-3 .3-1.4.7-2.5 1.7-2.5s1.4 1.1 1.7 2.5c.3 1.4.4 3 1.3 3 1.2 0 1.8-1.6 2.4-3.2.8-2.1 1.6-4.3 1.6-6.3 0-2.5-.9-4.3-2.5-4.4-1.1-.4-2.1.4-3.1.4z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconRepair() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14.5 6.5 18 3l2 2-3.5 3.5M14.5 6.5 6 15v3h3l8.5-8.5M14.5 6.5 17 9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 20l2-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconAligner() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 10c0-2.8 3.6-5 8-5s8 2.2 8 5-3.6 6-8 6-8-3.2-8-6z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M7 10.5c1.5.8 3.2 1.2 5 1.2s3.5-.4 5-1.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconSparkle() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3v4M12 17v4M4 12h4M16 12h4M6.5 6.5l2 2M15.5 15.5l2 2M17.5 6.5l-2 2M8.5 15.5l-2 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconDrop() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5c3 3.6 6 7.4 6 10.7A6 6 0 0 1 6 14.2c0-3.3 3-7.1 6-10.7z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5 19 6v6c0 4.5-3.2 7.5-7 8.5-3.8-1-7-4-7-8.5V6l7-2.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ICONS = [IconTooth, IconRepair, IconAligner, IconSparkle, IconDrop, IconShield];

export default function ScopeServices({ services }: { services: string[] }) {
  return (
    <section id="scope" className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          What I can cover in your chair
        </h2>
        <ul className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <li key={service} className="flex flex-col items-center gap-4 text-center">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-mint text-teal-deep [&_svg]:h-7 [&_svg]:w-7">
                  <Icon />
                </span>
                <span className="text-sm text-ink/80 sm:text-base">{service}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
