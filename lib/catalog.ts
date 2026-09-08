import { createClient } from "@/lib/supabase/server";
import { courses as courseDesign } from "@/lib/courses";
export type Lesson = {
  id: string;
  course_id: string;
  title: string;
  summary: string;
  video_url: string | null;
  position: number;
};
export async function getCatalog() {
  const db = await createClient();
  const [{ data: rows, error }, { data: lessons, error: lessonError }] =
    await Promise.all([
      db
        .from("courses")
        .select("id,code,title,description,accent,status")
        .eq("status", "published")
        .order("sort_order"),
      db
        .from("lessons")
        .select("id,course_id,title,summary,video_url,position")
        .eq("status", "published")
        .order("position"),
    ]);
  if (error || lessonError)
    return {
      courses: [],
      lessons: [] as Lesson[],
      error:
        "The course library is temporarily unavailable. Please try again shortly.",
    };
  return {
    courses: (rows || []).map((row) => {
      const style = courseDesign.find((c) => c.code === row.code);
      const count = (lessons || []).filter(
        (l) => l.course_id === row.id,
      ).length;
      return {
        ...style,
        ...row,
        symbol: style?.symbol || "CS",
        topics: style?.topics || [],
        lessons: count,
        status: count ? "Reading available" : "Coming soon",
      };
    }),
    lessons: (lessons || []) as Lesson[],
    error: null,
  };
}
