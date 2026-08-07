"use client";

import { useEffect, useState } from "react";

type Booking = {
  id: string;
  practiceName: string;
  contactName: string;
  email: string;
  phone: string;
  software: string | null;
  requestedDates: string;
  message: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
};

type Testimonial = {
  id: string;
  clinicName: string;
  authorName: string;
  quote: string;
  rating: number;
  approved: boolean;
};

const TABS = ["Bookings", "Testimonials", "Content", "SEO & Meta"] as const;
type Tab = (typeof TABS)[number];

const SEO_KEYS = ["seo_title", "seo_description", "seo_keywords", "og_image_url", "favicon_url"];

export default function DashboardClient() {
  const [tab, setTab] = useState<Tab>("Bookings");

  return (
    <div>
      <div className="mb-8 flex gap-2 border-b border-line/60">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium ${
              tab === t
                ? "border-b-2 border-teal-deep text-teal-deep"
                : "text-ink/50 hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Bookings" && <BookingsPanel />}
      {tab === "Testimonials" && <TestimonialsPanel />}
      {tab === "Content" && <ContentPanel excludeKeys={SEO_KEYS} title="Rates, services & compliance" />}
      {tab === "SEO & Meta" && <ContentPanel onlyKeys={SEO_KEYS} title="SEO & site metadata" />}
    </div>
  );
}

function BookingsPanel() {
  const [bookings, setBookings] = useState<Booking[] | null>(null);

  async function load() {
    const res = await fetch("/api/bookings");
    const data = await res.json();
    setBookings(data.bookings ?? []);
  }

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data.bookings ?? []));
  }, []);

  async function setStatus(id: string, status: Booking["status"]) {
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  }

  if (!bookings) return <p className="text-sm text-ink/50">Loading…</p>;
  if (bookings.length === 0) return <p className="text-sm text-ink/50">No booking requests yet.</p>;

  return (
    <div className="space-y-4">
      {bookings.map((b) => (
        <div key={b.id} className="rounded-2xl border border-line/60 bg-white p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-medium text-ink">{b.practiceName}</p>
              <p className="text-sm text-ink/60">
                {b.contactName} · {b.email} · {b.phone}
              </p>
              <p className="mt-1 text-sm text-ink/80">
                Requested: <span className="font-mono-data">{b.requestedDates}</span>
                {b.software && <> · Software: {b.software}</>}
              </p>
              {b.message && <p className="mt-1 text-sm text-ink/60">{b.message}</p>}
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                b.status === "APPROVED"
                  ? "bg-teal-deep/10 text-teal-deep"
                  : b.status === "REJECTED"
                    ? "bg-coral/10 text-coral"
                    : "bg-line/40 text-ink/60"
              }`}
            >
              {b.status}
            </span>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setStatus(b.id, "APPROVED")}
              className="rounded-full border border-teal-deep px-3 py-1 text-xs text-teal-deep hover:bg-mint"
            >
              Approve
            </button>
            <button
              onClick={() => setStatus(b.id, "REJECTED")}
              className="rounded-full border border-coral px-3 py-1 text-xs text-coral hover:bg-coral/10"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function TestimonialsPanel() {
  const [testimonials, setTestimonials] = useState<Testimonial[] | null>(null);
  const [form, setForm] = useState({ clinicName: "", authorName: "", quote: "", rating: 5 });

  async function load() {
    const res = await fetch("/api/testimonials?all=1");
    const data = await res.json();
    setTestimonials(data.testimonials ?? []);
  }

  useEffect(() => {
    fetch("/api/testimonials?all=1")
      .then((res) => res.json())
      .then((data) => setTestimonials(data.testimonials ?? []));
  }, []);

  async function toggleApproved(id: string, approved: boolean) {
    await fetch(`/api/testimonials/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved }),
    });
    load();
  }

  async function remove(id: string) {
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    load();
  }

  async function addTestimonial() {
    if (!form.clinicName || !form.authorName || !form.quote) return;
    await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, approved: true }),
    });
    setForm({ clinicName: "", authorName: "", quote: "", rating: 5 });
    load();
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-line/60 bg-white p-5">
        <p className="mb-3 text-sm font-medium text-ink">Add a testimonial</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            placeholder="Clinic name"
            value={form.clinicName}
            onChange={(e) => setForm({ ...form, clinicName: e.target.value })}
            className="rounded-xl border border-line px-3 py-2 text-sm"
          />
          <input
            placeholder="Author name"
            value={form.authorName}
            onChange={(e) => setForm({ ...form, authorName: e.target.value })}
            className="rounded-xl border border-line px-3 py-2 text-sm"
          />
          <textarea
            placeholder="Quote"
            value={form.quote}
            onChange={(e) => setForm({ ...form, quote: e.target.value })}
            className="rounded-xl border border-line px-3 py-2 text-sm sm:col-span-2"
          />
        </div>
        <button
          onClick={addTestimonial}
          className="mt-3 rounded-full bg-teal-deep px-4 py-2 text-xs font-medium text-cream hover:bg-teal"
        >
          Add & approve
        </button>
      </div>

      {testimonials?.map((t) => (
        <div key={t.id} className="rounded-2xl border border-line/60 bg-white p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-medium text-ink">{t.clinicName}</p>
              <p className="text-sm text-ink/60">{t.authorName} · {t.rating}/5</p>
              <p className="mt-1 text-sm text-ink/80">{t.quote}</p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                t.approved ? "bg-teal-deep/10 text-teal-deep" : "bg-line/40 text-ink/60"
              }`}
            >
              {t.approved ? "Approved" : "Pending"}
            </span>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => toggleApproved(t.id, !t.approved)}
              className="rounded-full border border-teal-deep px-3 py-1 text-xs text-teal-deep hover:bg-mint"
            >
              {t.approved ? "Unapprove" : "Approve"}
            </button>
            <button
              onClick={() => remove(t.id)}
              className="rounded-full border border-coral px-3 py-1 text-xs text-coral hover:bg-coral/10"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function ContentPanel({
  onlyKeys,
  excludeKeys,
  title,
}: {
  onlyKeys?: string[];
  excludeKeys?: string[];
  title: string;
}) {
  const [content, setContent] = useState<Record<string, string> | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => setContent(data.content));
  }, []);

  async function save() {
    if (!content) return;
    const keys = onlyKeys ?? Object.keys(content).filter((k) => !excludeKeys?.includes(k));
    const payload = Object.fromEntries(keys.map((k) => [k, content[k]]));
    await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!content) return <p className="text-sm text-ink/50">Loading…</p>;

  const keys = onlyKeys ?? Object.keys(content).filter((k) => !excludeKeys?.includes(k));

  return (
    <div className="rounded-2xl border border-line/60 bg-white p-5">
      <p className="mb-4 text-sm font-medium text-ink">{title}</p>
      <div className="space-y-4">
        {keys.map((key) => (
          <div key={key}>
            <label className="block text-xs font-mono-data text-ink/50">{key}</label>
            <textarea
              value={content[key] ?? ""}
              onChange={(e) => setContent({ ...content, [key]: e.target.value })}
              rows={key === "services_list" || key === "seo_description" ? 3 : 1}
              className="mt-1 w-full rounded-xl border border-line px-3 py-2 text-sm"
            />
          </div>
        ))}
      </div>
      <button
        onClick={save}
        className="mt-4 rounded-full bg-teal-deep px-4 py-2 text-xs font-medium text-cream hover:bg-teal"
      >
        {saved ? "Saved ✓" : "Save changes"}
      </button>
    </div>
  );
}
