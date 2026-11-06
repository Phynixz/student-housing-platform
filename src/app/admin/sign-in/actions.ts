"use server";

import { redirect } from "next/navigation";

import { getCurrentAccount } from "@/lib/data/account";
import { normalizeEmail } from "@/lib/auth/email-validation";
import {
  clearAuthSession,
  signInWithPassword,
} from "@/lib/supabase/auth-server";
import { safeAdminNextPath } from "@/lib/supabase/auth-shared";

function signInRedirect(type: "error" | "message", message: string) {
  const params = new URLSearchParams({ [type]: message });
  return `/admin/sign-in?${params.toString()}`;
}

export async function adminSignIn(formData: FormData) {
  const email = normalizeEmail(formData.get("email"));
  const password = String(formData.get("password") ?? "");
  const nextPath = safeAdminNextPath(formData.get("next"));
  const configuredEmail = normalizeEmail(process.env.ADMIN_LOGIN_EMAIL);
  const configuredPassword = process.env.ADMIN_LOGIN_PASSWORD ?? "";

  if (!configuredEmail || !configuredPassword) {
    redirect(
      signInRedirect(
        "error",
        "Admin sign-in is not configured for this deployment.",
      ),
    );
  }

  if (!email || !password) {
    redirect(signInRedirect("error", "Enter your admin email and password."));
  }

  if (email !== configuredEmail) {
    redirect(signInRedirect("error", "Email or password is incorrect."));
  }

  const { session, error } = await signInWithPassword(email, password);

  if (error || !session) {
    redirect(signInRedirect("error", "Email or password is incorrect."));
  }

  if (
    password !== configuredPassword ||
    normalizeEmail(session.user.email) !== configuredEmail
  ) {
    await clearAuthSession();
    redirect(signInRedirect("error", "Email or password is incorrect."));
  }

  const { user, profile } = await getCurrentAccount();

  if (
    !user ||
    user.id !== session.user.id ||
    !profile ||
    profile.role !== "admin"
  ) {
    await clearAuthSession();
    redirect(
      signInRedirect(
        "error",
        "This account is not authorized for the admin workspace.",
      ),
    );
  }

  redirect(nextPath);
}
