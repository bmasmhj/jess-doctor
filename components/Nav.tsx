"use client";

import { useState } from "react";

const links = [
  { href: "#scope", label: "Scope" },
  { href: "#compliance", label: "Compliance" },
  { href: "#rates", label: "Rates" },
];

export default function Nav({ siteName }: { siteName: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-cream/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#" className="font-script text-2xl text-teal-deep">
          {siteName}
        </a>
        <ul className="hidden items-center gap-7 text-sm text-ink/70 sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors hover:text-teal-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#book"
          className="hidden rounded-full bg-teal-deep px-4 py-2 text-sm font-medium text-cream transition-colors hover:bg-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral sm:inline-block"
        >
          Book a shift
        </a>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal sm:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            {open ? (
              <path
                d="M5 5L17 17M17 5L5 17"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : (
              <>
                <path d="M3 6.5H19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M3 11H19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M3 15.5H19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </nav>

      <div
        id="mobile-menu"
        inert={!open}
        className={`grid overflow-hidden border-t border-line/70 transition-[grid-template-rows] duration-300 ease-out sm:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-t-0"
        }`}
      >
        <ul className="flex min-h-0 flex-col px-6 py-2 text-base text-ink/80">
          {links.map((link) => (
            <li key={link.href} className="border-b border-line/40 last:border-none">
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center py-3 transition-colors hover:text-teal-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="py-3">
            <a
              href="#book"
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center justify-center rounded-full bg-teal-deep px-4 text-sm font-medium text-cream transition-colors hover:bg-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
            >
              Book a shift
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
