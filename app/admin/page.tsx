import type { Metadata } from "next";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { AppPage } from "@/components/app-page";
import { AdminConsole } from "@/components/admin-console";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Admin", description: "EduMoe curriculum and learning operations workspace." };
export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isAdmin = user?.app_metadata?.role === "admin";

  if (!isAdmin) return <AppPage eyebrow="Restricted operations" title="Admin access is protected." description="EduMoe never trusts a hidden button or a public client flag. A verified Supabase session and an admin role in app metadata are required."><section className="admin-lock glass-panel"><LockKeyhole size={28} /><h2>{user ? "This account is not an administrator." : "Sign in with an administrator account."}</h2><p>Content mutations must also be protected by Row Level Security and server-side role checks. The interface remains closed until that backend role is assigned.</p><Link className="button button-primary" href="/login?next=/admin">{user ? "Use another account" : "Secure sign in"}</Link></section></AppPage>;

  return <AppPage eyebrow="Operations" title="Run the learning system clearly." description="A role-gated control center for curriculum, questions, learners, audit history, and platform signals." wide><AdminConsole /></AppPage>;
}
