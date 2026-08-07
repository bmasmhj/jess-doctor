"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

type Status = "idle" | "submitting" | "success" | "error";
type DayAvailability = { date: string; available: boolean };

function toDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatSelectedDates(dates: Date[]) {
  const sorted = [...dates].sort((a, b) => a.getTime() - b.getTime());
  const parts = sorted.map((d) => d.toLocaleDateString("en-AU", { day: "numeric", month: "short" }));
  const year = sorted[sorted.length - 1].getFullYear();
  return `${parts.join(", ")} ${year}`;
}

export default function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [dateError, setDateError] = useState(false);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/availability")
      .then((res) => res.json())
      .then((data: { days?: DayAvailability[] }) => {
        const booked = (data.days ?? []).filter((d) => !d.available).map((d) => toDate(d.date));
        setBookedDates(booked);
      })
      .catch(() => setBookedDates([]));
  }, []);

  useEffect(() => {
    if (!calendarOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!calendarWrapRef.current?.contains(event.target as Node)) {
        setCalendarOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setCalendarOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [calendarOpen]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (selectedDates.length === 0) {
      setDateError(true);
      return;
    }
    setDateError(false);
    setStatus("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      practiceName: data.get("practiceName"),
      contactName: data.get("contactName"),
      email: data.get("email"),
      phone: data.get("phone"),
      software: data.get("software"),
      requestedDates: formatSelectedDates(selectedDates),
      message: data.get("message"),
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
      setSelectedDates([]);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-line/60 bg-cream px-6 py-10 text-center">
        <p className="font-display text-xl text-teal-deep">Request sent</p>
        <p className="mt-2 text-sm text-ink/70">
          Thanks — I&apos;ll get back to you shortly to confirm the shift.
        </p>
      </div>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Field label="Practice name" name="practiceName" required />
      <Field label="Your name" name="contactName" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Phone" name="phone" type="tel" required />
      <Field
        label="Software you use"
        name="software"
        placeholder="e.g. Dental4Windows, Exact"
      />

      <div className="relative " ref={calendarWrapRef}>
        <label className="block text-sm text-ink/70" htmlFor="requested-dates-trigger">
          Requested date(s) <span aria-hidden>*</span>
        </label>
        <button
          id="requested-dates-trigger"
          type="button"
          aria-haspopup="dialog"
          aria-expanded={calendarOpen}
          onClick={() => setCalendarOpen((v) => !v)}
          className="mt-1 flex w-full items-center justify-between rounded-xl border border-line bg-cream px-4 py-2 text-left text-sm outline-none focus-visible:border-teal-deep focus-visible:ring-2 focus-visible:ring-teal/30"
        >
          <span className={selectedDates.length > 0 ? "text-ink" : "text-ink/50"}>
            {selectedDates.length > 0
              ? formatSelectedDates(selectedDates)
              : "Pick one or more dates"}
          </span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0 text-ink/50">
            <rect x="2.5" y="3.5" width="13" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
            <path d="M2.5 7h13M5.5 2v3M12.5 2v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>

        {calendarOpen && (
          <div
            role="dialog"
            aria-label="Choose requested dates"
            className="absolute z-20 mt-2 flex justify-center rounded-xl border border-line bg-white p-3 shadow-[0_20px_45px_-25px_rgba(31,42,40,0.45)]"
          >
            <DayPicker
              mode="multiple"
              selected={selectedDates}
              onSelect={(dates) => {
                setSelectedDates(dates ?? []);
                if (dates && dates.length > 0) setDateError(false);
              }}
              className="availability-calendar"
              disabled={[{ before: today }, ...bookedDates]}
            />
          </div>
        )}

        <p className="mt-2 text-xs text-ink/60">Greyed-out days are already booked.</p>
        {dateError && (
          <p className="mt-1 text-xs text-coral">Pick at least one date before sending.</p>
        )}
      </div>

      <div className="sm:col-span-2">
        <label className="block text-sm text-ink/70" htmlFor="message">
          Anything else
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="mt-1 w-full rounded-xl border border-line bg-cream px-4 py-2 text-sm outline-none focus-visible:border-teal-deep focus-visible:ring-2 focus-visible:ring-teal/30"
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-full bg-teal-deep px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send booking request"}
        </button>
        {status === "error" && (
          <p className="mt-3 text-sm text-coral">
            Something went wrong sending your request — email me directly instead.
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm text-ink/70" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-line bg-cream px-4 py-2 text-sm outline-none focus-visible:border-teal-deep focus-visible:ring-2 focus-visible:ring-teal/30"
      />
    </div>
  );
}
