import type { Metadata } from "next";
import { Flame, Sparkles } from "lucide-react";
import { AppPage } from "@/components/app-page";
import { DashboardExperience } from "@/components/dashboard-experience";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Dashboard", description: "Your connected EduMoe learning dashboard." };
export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = user ? await supabase.from("profiles").select("display_name").eq("user_id", user.id).maybeSingle() : { data: null };
  const { data: progress } = user ? await supabase.from("course_progress").select("course_code,current_lesson,percent").eq("user_id", user.id) : { data: [] };
  return <AppPage eyebrow={user ? `Welcome back, ${profile?.display_name || "Student"}` : "Your learning dashboard"} title="Keep the next step obvious." description={user ? "Your progress is connected without spending an AI call on ordinary analytics." : "Preview the learning system, then sign in when you want progress to sync across devices."} meta={<><span><Flame size={15} /> 14-day streak</span><span><Sparkles size={15} /> Deterministic analytics</span></>}><DashboardExperience progressRows={progress || []} connected={Boolean(user)} /></AppPage>;
}
