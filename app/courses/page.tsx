import type { Metadata } from "next";
import { BookOpen, Clock3 } from "lucide-react";
import { AppPage } from "@/components/app-page";
import { CourseCatalog } from "@/components/course-catalog";
import { courses } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Courses",
  description: "Explore eight connected first-year Computer Science learning paths.",
};

export default function CoursesPage() {
  return <AppPage eyebrow="Curriculum map" title="Eight subjects. One learning path." description="Move from lecture to practice without losing the context that makes the concept click." meta={<><span><BookOpen size={15} /> 8 live courses</span><span><Clock3 size={15} /> 64 lessons</span></>}><CourseCatalog courses={courses} /></AppPage>;
}

