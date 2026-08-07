"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const data = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });

    setSubmitting(false);

    if (result?.error) {
      setError("Incorrect email or password.");
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-line/60 bg-white p-8"
      >
        <h1 className="font-display text-2xl text-ink">Admin sign in</h1>
        <p className="mt-1 text-sm text-ink/60">Manage bookings, testimonials & content.</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm text-ink/70" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-xl border border-line bg-cream px-4 py-2 text-sm outline-none focus-visible:border-teal-deep focus-visible:ring-2 focus-visible:ring-teal/30"
            />
          </div>
          <div>
            <label className="block text-sm text-ink/70" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-xl border border-line bg-cream px-4 py-2 text-sm outline-none focus-visible:border-teal-deep focus-visible:ring-2 focus-visible:ring-teal/30"
            />
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-coral">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-full bg-teal-deep px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-teal disabled:opacity-60"
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
