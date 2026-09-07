import type { Metadata } from "next";
import { Flame, Sparkles } from "lucide-react";
import { AppPage } from "@/components/app-page";
import { DashboardExperience } from "@/components/dashboard-experience";

export const metadata: Metadata = { title: "Dashboard", description: "Your connected EduMoe learning dashboard." };
export default function DashboardPage() { return <AppPage eyebrow="Good morning, Ahmed" title="Keep the next step obvious." description="Two focused tasks today. Your learning context, progress, and recommendations are already connected." meta={<><span><Flame size={15} /> 14-day streak</span><span><Sparkles size={15} /> 1,240 XP</span></>}><DashboardExperience /></AppPage>; }

