# Jaspreet Kaur — OHT Locum Website

Next.js + MySQL site for booking locum/casual relief shifts. Public marketing page plus an admin dashboard for managing booking requests, testimonials, and editable content (rates, compliance text, SEO/meta).

## Stack
- Next.js 16 (App Router, TypeScript), Tailwind CSS
- Prisma ORM + MySQL (via `@prisma/adapter-mariadb`, works against any MySQL-compatible host)
- NextAuth v5 (Credentials) for the single admin login
- Google Calendar API (service account, read-only) for live availability

## Local setup
1. `npm install`
2. Copy `.env.example` to `.env` and fill in `DATABASE_URL`, `NEXTAUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
3. `npx prisma db push` — applies the schema directly (the hosting DB user doesn't have CREATE DATABASE rights needed for shadow-DB migrations, so use `db push`, not `migrate dev`)
4. `npm run db:seed` — creates the admin user and default content rows (re-running is safe; it won't overwrite content you've already edited)
5. `npm run dev`

## Admin
Sign in at `/admin/login` with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env`. From the dashboard you can:
- Approve/reject booking requests
- Add/approve/delete testimonials
- Edit rates, services, compliance placeholders, and SEO/meta fields — changes appear on the public page immediately, no redeploy needed

**Change the seeded admin password before going live.**

## Google Calendar (live availability)
1. Create a Google Cloud service account with the Calendar API enabled
2. Share your Google Calendar with the service account's email, read-only access
3. Set `GOOGLE_SERVICE_ACCOUNT_KEY` (the full service account JSON, stringified) and `GOOGLE_CALENDAR_ID` (usually your Google account email) in `.env`
4. Any day with an event on that calendar shows as booked; everything else shows as available

Until these are set, the Availability section shows a friendly fallback message pointing visitors to the booking form.

## Deployment
Same `DATABASE_URL` and other env vars work unchanged on Vercel or a VPS/shared host running `next start`. If you hit connection exhaustion against a shared MySQL host from a serverless deploy, try appending `?connection_limit=1` to `DATABASE_URL`.
