"use client";

import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

type DayAvailability = { date: string; available: boolean };

function toDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export default function Availability() {
  const [days, setDays] = useState<DayAvailability[] | null>(null);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState<Date | undefined>(undefined);

  useEffect(() => {
    fetch("/api/availability")
      .then((res) => res.json())
      .then((data) => setDays(data.days ?? []))
      .catch(() => setError(true));
  }, []);

  const connected = !error && !!days && days.length > 0;
  const availableDates = connected
    ? days.filter((d) => d.available).map((d) => toDate(d.date))
    : [];
  const bookedDates = connected
    ? days.filter((d) => !d.available).map((d) => toDate(d.date))
    : [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <section id="availability" className="py-20">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Open dates, straight from my calendar
        </h2>

        <div className="mt-8 rounded-2xl border border-line/60 bg-white p-4 sm:p-6">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            className="availability-calendar"
            numberOfMonths={2}
            disabled={{ before: today }}
            modifiers={{
              available: availableDates,
              booked: bookedDates,
            }}
            modifiersClassNames={{
              available: "day-available",
              booked: "day-booked",
            }}
          />
        </div>

        {connected ? (
          <div className="mt-4 flex gap-5 text-xs text-ink/60">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-lg bg-mint" /> Available
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-lg bg-line/40" /> Booked
            </span>
          </div>
        ) : (
          <p className="mt-4 text-xs text-ink/50">
            Live sync isn&apos;t connected yet, so dates above aren&apos;t
            colour-coded — send a booking request below with your preferred
            dates and I&apos;ll confirm by email.
          </p>
        )}
      </div>
    </section>
  );
}
