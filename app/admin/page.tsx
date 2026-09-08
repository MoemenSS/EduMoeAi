import type { Metadata } from "next";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { AppPage } from "@/components/app-page";
import { AdminConsole } from "@/components/admin-console";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Admin",
  description: "EduMoe curriculum and learning operations workspace.",
};
export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAdmin = user?.app_metadata?.role === "admin";

  if (!isAdmin)
    return (
      <AppPage
        eyebrow="Restricted operations"
        title="Admin access is protected."
        description="EduMoe never trusts a hidden button or a public client flag. A verified Supabase session and an admin role in app metadata are required."
      >
        <section className="admin-lock glass-panel">
          <LockKeyhole size={28} />
          <h2>
            {user
              ? "This account is not an administrator."
              : "Sign in with an administrator account."}
          </h2>
          <p>
            Content mutations must also be protected by Row Level Security and
            server-side role checks. The interface remains closed until that
            backend role is assigned.
          </p>
          <Link className="button button-primary" href="/login?next=/admin">
            {user ? "Use another account" : "Secure sign in"}
          </Link>
        </section>
      </AppPage>
    );

  const results = await Promise.all([
    supabase.from("courses").select("*").order("sort_order"),
    supabase.from("lessons").select("*").order("position"),
    supabase
      .from("content_records")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase.rpc("admin_students"),
    supabase
      .from("audit_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100),
    supabase
      .from("practice_questions")
      .select("*")
      .order("subject")
      .limit(1000),
  ]);
  const names = [
    "courses",
    "lessons",
    "resources",
    "students",
    "audit",
    "questions",
  ];
  const data = {
    courses: results[0].data || [],
    lessons: results[1].data || [],
    records: results[2].data || [],
    students: results[3].data || [],
    audit: results[4].data || [],
    questions: results[5].data || [],
    errors: results.flatMap((r, i) => (r.error ? [names[i]] : [])),
  };
  return (
    <AppPage
      eyebrow="Operations"
      title="Run the learning system clearly."
      description="A role-gated control center for curriculum, questions, learners, audit history, and platform signals."
      wide
    >
      <AdminConsole data={data} />
    </AppPage>
  );
}
