import { adminSignIn } from "@/app/admin/sign-in/actions";
import PasswordField from "@/components/auth/PasswordField";
import ActionSubmitButton from "@/components/ui/ActionSubmitButton";
import { safeAdminNextPath } from "@/lib/supabase/auth-shared";

interface AdminSignInContentProps {
  searchParams: Promise<{
    error?: string;
    message?: string;
    next?: string;
  }>;
}

export default async function AdminSignInContent({
  searchParams,
}: AdminSignInContentProps) {
  const params = await searchParams;
  const nextPath = safeAdminNextPath(params.next);

  return (
    <main className="grid min-h-screen place-items-center bg-[var(--paper)] px-4 py-10 sm:px-6">
      <section className="ui-enter grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[var(--border)] bg-white shadow-[0_28px_90px_-48px_rgba(20,54,49,0.42)] md:grid-cols-[0.86fr_1.14fr]">
        <div className="relative flex min-h-56 flex-col justify-between overflow-hidden bg-[var(--forest)] p-7 text-white sm:p-10 md:min-h-[560px]">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 size-64 rounded-full border border-white/10"
          />
          <div
            aria-hidden="true"
            className="absolute -right-8 -top-8 size-40 rounded-full border border-[var(--gold)]/35"
          />
          <div className="relative flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl border border-white/20 bg-white/10 text-xs font-black tracking-wide text-[var(--gold)]">
              SH
            </span>
            <span className="text-sm font-bold tracking-wide">
              Student Housing
            </span>
          </div>
          <div className="relative mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
              Restricted workspace
            </p>
            <h1 className="mt-4 max-w-sm font-serif text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
              Operations access.
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/75">
              Sign in with the administrator credentials configured for this
              deployment.
            </p>
          </div>
          <p className="relative mt-8 text-xs text-white/55">
            Authorized administrators only
          </p>
        </div>

        <div className="flex items-center px-6 py-9 sm:px-10 sm:py-12 lg:px-14">
          <div className="mx-auto w-full max-w-md">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--emerald)]">
              Admin sign in
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
              Access the admin workspace
            </h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              Enter the server-configured admin email and password.
            </p>

            {params.error ? (
              <div
                role="alert"
                className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-800"
              >
                {params.error}
              </div>
            ) : null}

            {params.message ? (
              <div
                role="status"
                className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium leading-6 text-emerald-900"
              >
                {params.message}
              </div>
            ) : null}

            <form action={adminSignIn} className="mt-6 space-y-4">
              <input type="hidden" name="next" value={nextPath} />
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
                  Admin email
                </span>
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="username"
                  inputMode="email"
                  spellCheck={false}
                  className="auth-input"
                />
              </label>

              <PasswordField
                name="password"
                label="Admin password"
                autoComplete="current-password"
                backgroundClassName="bg-white"
              />

              <ActionSubmitButton
                pendingText="Signing you in…"
                className="auth-primary-button"
              >
                Sign in to admin
              </ActionSubmitButton>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
