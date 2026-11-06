import AdminWorkspaceNav from "@/components/admin/AdminWorkspaceNav";

type AdminWorkspaceSection = "reviews" | "payments";

interface AdminDataUnavailableProps {
  current: AdminWorkspaceSection;
}

export default function AdminDataUnavailable({
  current,
}: AdminDataUnavailableProps) {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-16">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-[var(--emerald)]">
          Admin workspace
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-[var(--forest)]">
          Admin data connection unavailable
        </h1>
      </div>

      <AdminWorkspaceNav current={current} />

      <section
        role="alert"
        className="mt-8 rounded-3xl border border-amber-300 bg-amber-50 p-6 text-sm leading-6 text-amber-950"
      >
        <h2 className="font-bold">Configure the server-side Supabase key</h2>
        <p className="mt-2">
          Admin credentials sign you in, but this workspace still needs
          <code className="mx-1 rounded bg-amber-100 px-1.5 py-0.5 font-mono">
            SUPABASE_SECRET_KEY
          </code>
          to load and manage listings, reports, support requests, and payout
          setup. Add it to the hosting environment for the same Supabase project
          as the app, keep it server-only, and redeploy.
        </p>
      </section>
    </div>
  );
}
