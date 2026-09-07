import type { Metadata } from "next";
import { AppPage } from "@/components/app-page";
import { AdminConsole } from "@/components/admin-console";

export const metadata: Metadata = { title: "Admin", description: "EduMoe curriculum and learning operations workspace." };
export default function AdminPage() { return <AppPage eyebrow="Operations" title="Run the learning system clearly." description="A focused control center for curriculum, questions, learners, and platform signals." wide><AdminConsole /></AppPage>; }

