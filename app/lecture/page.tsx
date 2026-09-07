import type { Metadata } from "next";
import { AppPage } from "@/components/app-page";
import { LectureWorkspace } from "@/components/lecture-workspace";

export const metadata: Metadata = { title: "Pointers · Lecture", description: "A connected Structured Programming lecture workspace." };
export default function LecturePage() { return <AppPage eyebrow="Structured Programming" title="Lesson workspace" description="Watch, read, practice, and ask without leaving the concept behind." wide><LectureWorkspace /></AppPage>; }

