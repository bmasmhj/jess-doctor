import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/auth";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm text-ink/60">Signed in as {session.user?.email}</p>
          <h1 className="font-display text-3xl text-ink">Admin dashboard</h1>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin/login" });
          }}
        >
          <button className="rounded-full border border-line px-4 py-2 text-sm text-ink/70 hover:bg-mint">
            Sign out
          </button>
        </form>
      </div>

      <DashboardClient />
    </main>
  );
}
