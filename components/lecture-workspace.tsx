"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, BookOpen, ExternalLink } from "lucide-react";
import type { Lesson } from "@/lib/catalog";
import { createClient } from "@/lib/supabase/client";
function youtubeEmbed(raw: string | null) {
  if (!raw) return null;
  try {
    const u = new URL(raw);
    const id =
      u.hostname === "youtu.be"
        ? u.pathname.slice(1)
        : ["youtube.com", "www.youtube.com"].includes(u.hostname)
          ? u.searchParams.get("v")
          : null;
    return id && /^[\w-]{11}$/.test(id)
      ? `https://www.youtube-nocookie.com/embed/${id}`
      : null;
  } catch {
    return null;
  }
}
export function LectureWorkspace({
  course,
  title,
  lessons,
  selectedId,
}: {
  course: string;
  title: string;
  lessons: Lesson[];
  selectedId?: string;
}) {
  const [selected, setSelected] = useState(
    selectedId && lessons.some((l) => l.id === selectedId)
      ? selectedId
      : lessons[0]?.id,
  );
  const [status, setStatus] = useState(""),
    [saving, setSaving] = useState(false),
    [completed, setCompleted] = useState<string[]>([]),
    [video, setVideo] = useState(false);
  const lesson = lessons.find((l) => l.id === selected),
    embed = youtubeEmbed(lesson?.video_url || null);
  async function complete() {
    if (!lesson || saving) return;
    setSaving(true);
    try {
      const db = createClient();
      const {
        data: { user },
      } = await db.auth.getUser();
      if (!user) {
        setStatus("Sign in to save course progress to your account.");
        return;
      }
      const { error } = await db.rpc("complete_lesson", {
        lesson_id: lesson.id,
      });
      if (error) {
        setStatus("Progress could not be saved. Please try again.");
        return;
      }
      setCompleted((ids) => [...new Set([...ids, lesson.id])]);
      setStatus("Lesson completed. Your dashboard has been updated.");
    } catch {
      setStatus("Connection interrupted. Please try again.");
    } finally {
      setSaving(false);
    }
  }
  return (
    <div className="lecture-layout">
      <aside className="lesson-sidebar workspace-panel">
        <div className="lesson-course">
          <span>{course}</span>
          <strong>{title}</strong>
          <small>{lessons.length} published readings</small>
        </div>
        <div className="lesson-list">
          {lessons.map((item, i) => (
            <button
              className={item.id === selected ? "active" : ""}
              key={item.id}
              onClick={() => {
                setSelected(item.id);
                setVideo(false);
                setStatus("");
              }}
            >
              <span>
                {completed.includes(item.id) ? <Check size={13} /> : i + 1}
              </span>
              {item.title}
            </button>
          ))}
        </div>
        <Link href="/courses">
          All courses <ArrowRight size={14} />
        </Link>
      </aside>
      <article className="lesson-main">
        {lesson ? (
          <>
            <header className="lesson-header">
              <div>
                <span className="section-kicker">
                  READING · WORKED EXPLANATION
                </span>
                <h1>{lesson.title}</h1>
              </div>
              <button
                className="lesson-complete"
                disabled={saving || completed.includes(lesson.id)}
                onClick={complete}
              >
                {saving
                  ? "Saving…"
                  : completed.includes(lesson.id)
                    ? "Completed"
                    : "Mark complete"}
              </button>
            </header>
            {status ? (
              <p role="status" className="lesson-save-status">
                {status}{" "}
                {status.startsWith("Sign in") ? (
                  <Link
                    href={`/login?next=${encodeURIComponent(`/lecture?course=${course}`)}`}
                  >
                    Sign in →
                  </Link>
                ) : null}
              </p>
            ) : null}
            {embed ? (
              <section className="lesson-video glass-panel">
                {video ? (
                  <iframe src={embed} title={lesson.title} allowFullScreen />
                ) : (
                  <button
                    className="button button-primary"
                    onClick={() => setVideo(true)}
                  >
                    Watch the lecture
                  </button>
                )}
              </section>
            ) : (
              <div className="reading-label">
                <BookOpen size={16} /> Reading available · video edition not
                published yet
              </div>
            )}
            <section className="lesson-content workspace-panel">
              {lesson.summary.split(/\n\n/).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </section>
            <div className="hero-actions">
              <Link className="button button-primary" href="/quizzes">
                Check your understanding <ArrowRight size={15} />
              </Link>
              <Link className="button button-secondary" href="/simulators">
                Try it in the lab <ExternalLink size={15} />
              </Link>
              <Link
                className="button button-secondary"
                href={`/moeai?course=${course}`}
              >
                Open MoeAI context
              </Link>
            </div>
          </>
        ) : (
          <section className="lesson-content workspace-panel">
            <h2>This course is being prepared.</h2>
            <p>
              No lectures have been published yet. You can still practice its
              concepts and explore the labs.
            </p>
            <Link href="/quizzes">Open practice →</Link>
          </section>
        )}
      </article>
    </div>
  );
}
