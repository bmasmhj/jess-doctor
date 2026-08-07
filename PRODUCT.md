# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 (App Router, TypeScript) + Tailwind CSS + Prisma/MySQL. Delegated: chosen to support light backend needs (admin-managed bookings, testimonials, and editable content) beyond what a static builder offers, per the user's explicit request for "Next + MySQL."

## Users

Primary user: a dental clinic's practice/office manager, most often mid-crisis — covering sudden sick leave or a no-show — who needs to confirm within seconds that Jaspreet Kaur is credentialed, available, and affordable enough to book without a phone call. Secondary, lower-priority case: managers planning known leave (maternity, holidays) weeks ahead, who read the page more calmly and compare rates/scope in more depth. The homepage should optimize for the urgent-gap scan first.

## Product Purpose

A single-page marketing and booking site for Jaspreet Kaur, an independent Oral Health Therapist (OHT), so clinics can self-serve a locum/casual-relief booking without going through an agency or an email back-and-forth. Success = a practice manager can verify credentials, check real availability, and submit a booking request in one visit.

## Positioning

Self-service speed and transparency over the agency model: no middleman, no negotiation loop. Live availability (pulled from Google Calendar), explicit rates, and sightable credentials sit directly on the page, so a booking decision takes minutes, not calls or emails back and forth with an agency.

## Operating Context

- Clinics run their own practice management software (e.g. Dental4Windows, Exact) — the booking form asks which, so Jaspreet can prep accordingly.
- Google Calendar is the availability source of truth; a service account reads busy/free and the site renders its own calendar UI (no iframe/embed).
- An admin dashboard (NextAuth-gated, single admin: Jaspreet) lets her approve/reject booking requests, add/approve/delete testimonials, and edit rates/services/compliance/SEO text without a redeploy.

## Capabilities and Constraints

- Confirmed clinical scope shown on-site: full adult scope (therapy & hygiene), restorative care, Invisalign/clear-aligner attachment maintenance, in-chair and take-home whitening, nitrous oxide sedation support, preventative care.
- Software-competency section (which practice software she's used) is explicitly deferred/omitted for now — not yet decided what to list.
- Region/service area is an undecided, unfilled placeholder (`[YOUR REGION]`) — not yet confirmed.
- Rates structure is confirmed: $100/hr for a single day, $80/hr for bookings of 7+ consecutive days; minimum booking duration and travel radius are still placeholders.

## Brand Commitments

Name: Jaspreet Kaur. Title: Independent Oral Health Therapist (OHT). No logo, voice guide, or visual references have been supplied yet.

## Evidence on Hand

Nothing is confirmed real yet — explicitly placeholder-only:
- AHPRA registration number, WWCC number, radiation licence number, professional indemnity insurer/policy, first-aid/CPR expiry: all bracketed placeholders (e.g. `[AHPRA REGISTRATION NUMBER]`), not real values.
- No real testimonials exist yet; the testimonials feature is wired up (admin can add/approve) but currently empty.
- No confirmed years of experience, past clinics worked with, headshot photo, or LinkedIn URL — all placeholders.
- Future design or content work must not fabricate realistic-looking credential numbers, testimonial quotes, or clinic names to fill these gaps.

## Product Principles

1. Speed-to-trust wins: every above-the-fold decision should shorten the path from "landed on page" to "confident this is legitimate and available."
2. Self-service replaces the agency call: live data (availability, rates, credentials) belongs on the page itself, not behind an email request.
3. Never fake evidence: placeholders stay visibly bracketed placeholders until Jaspreet supplies the real value — no invented numbers, quotes, or history.
4. Admin-editable, not redeploy-editable: anything likely to change (rates, compliance text, SEO copy, testimonials) lives in the CMS-lite content table, not hardcoded.

## Accessibility & Inclusion

No product-specific accessibility requirement has been established beyond standard web accessibility practice (semantic structure, visible focus states, reduced-motion support already implemented in the build).

## Theming

Light-only, decided deliberately rather than left as a gap. The primary use scene — a practice manager scanning the site during business hours on a work computer or phone to confirm credentials and book a shift — doesn't call for a dark variant, and the palette (cream/teal/coral) was designed as a single committed world, not a light/dark pair. `color-scheme: light` is declared explicitly (`app/globals.css`, `app/layout.tsx` viewport) so browser chrome (form controls, scrollbars) doesn't mismatch a user's OS dark-mode preference. Revisit only if real usage data shows meaningful evening/low-light traffic.
