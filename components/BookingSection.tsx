import BookingForm from "@/components/BookingForm";

export default function BookingSection() {
  return (
    <section id="book" className="bg-mint py-20">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
          Tell me about the shift
        </h2>
        <p className="mt-3 text-ink/70">
          Include your practice management software and the dates you need
          covered — I&apos;ll confirm availability by email.
        </p>
        <div className="mt-10">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
