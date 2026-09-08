"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Flame,
  Target,
  BookOpenCheck,
} from "lucide-react";
import { courses } from "@/lib/courses";
import { summarize, readLocalAttempts, type Attempt } from "@/lib/learning";
type ProgressRow = {
  course_code: string;
  current_lesson: string | null;
  percent: number;
};
export function DashboardExperience({
  progressRows = [],
  connected = false,
  attempts = [],
  userId = null,
}: {
  progressRows?: ProgressRow[];
  connected?: boolean;
  attempts?: Attempt[];
  userId?: string | null;
}) {
  const [local, setLocal] = useState<Attempt[]>([]);
  useEffect(() => {
    const id = requestAnimationFrame(() => setLocal(readLocalAttempts(userId)));
    return () => cancelAnimationFrame(id);
  }, [userId]);
  const history = [
    ...new Map([...local, ...attempts].map((a) => [a.id, a])).values(),
  ].sort((a, b) => b.created_at.localeCompare(a.created_at));
  const stats = summarize(history);
  return (
    <div className="dashboard-grid">
      <section className="focus-card glass-panel">
        <div className="focus-card-top">
          <span className="status-dot">
            <Flame size={14} /> Your next useful step
          </span>
          <span>{connected ? "Account connected" : "This device"}</span>
        </div>
        <div>
          <span className="section-kicker">
            {history.length ? "Keep the learning going" : "A fresh start"}
          </span>
          <h2>
            {stats.weaknesses.length
              ? `Revisit ${stats.weaknesses[0].topic.split(" / ").pop()}`
              : "Find your first lightbulb moment."}
          </h2>
          <p>
            {history.length
              ? "Your practice history shapes these suggestions. A short review is a good next step."
              : "Read a lesson or complete a practice set. Your real progress will appear here."}
          </p>
        </div>
        <div className="focus-actions">
          <Link className="button button-primary" href="/quizzes">
            {history.length ? "Keep practicing" : "Start a first set"}
            <ArrowRight size={16} />
          </Link>
          <Link className="button button-secondary" href="/courses">
            Explore courses
          </Link>
        </div>
      </section>
      <section className="metric-stack">
        <article>
          <Target size={17} />
          <strong>{stats.total ? `${stats.accuracy}%` : "—"}</strong>
          <span>Practice accuracy</span>
        </article>
        <article>
          <Flame size={17} />
          <strong>{stats.streak}</strong>
          <span>Day study streak</span>
        </article>
        <article>
          <BookOpenCheck size={17} />
          <strong>{stats.total}</strong>
          <span>Questions answered</span>
        </article>
      </section>
      <section className="workspace-panel progress-panel">
        <div className="panel-heading">
          <div>
            <span className="section-kicker">Course progress</span>
            <h2>Your semester, at a glance.</h2>
          </div>
        </div>
        <div className="progress-list">
          {courses.map((course) => {
            const row = progressRows.find((r) => r.course_code === course.code);
            return (
              <article key={course.code}>
                <div>
                  <span>{course.code}</span>
                  <Link href={`/lecture?course=${course.code}`}>
                    <strong>{course.title}</strong>
                  </Link>
                  <small>{row?.current_lesson || "Ready when you are"}</small>
                </div>
                <div className="progress-value">
                  <strong>{row?.percent || 0}%</strong>
                  <span>
                    <i style={{ width: `${row?.percent || 0}%` }} />
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <section className="workspace-panel recommendation-panel">
        <div className="panel-heading">
          <div>
            <span className="section-kicker">Shared with MoeAI</span>
            <h2>What needs attention.</h2>
          </div>
          <BrainCircuit size={20} />
        </div>
        <div className="recommendation-list">
          {stats.weaknesses.length ? (
            stats.weaknesses.map((item) => (
              <Link href="/quizzes" key={item.topic}>
                <div>
                  <strong>{item.topic}</strong>
                  <small>
                    {item.correct}/{item.total} correct · {item.accuracy}%
                    accuracy
                  </small>
                </div>
                <ArrowRight size={16} />
              </Link>
            ))
          ) : (
            <p className="empty-note">
              {stats.total
                ? "No weak topics in your recorded answers. Try a different subject to broaden your practice."
                : "Finish a quiz to build your first learning signals."}
            </p>
          )}
        </div>
        <Link href="/moeai" className="button button-secondary">
          Open MoeAI context <ArrowRight size={15} />
        </Link>
      </section>
      <section className="workspace-panel schedule-panel">
        <div className="panel-heading">
          <div>
            <span className="section-kicker">Recent practice</span>
            <h2>Your learning trail.</h2>
          </div>
        </div>
        {history.length ? (
          <div className="progress-list">
            {history.slice(0, 5).map((attempt) => (
              <article key={attempt.id}>
                <div>
                  <strong>{attempt.subject}</strong>
                  <small>
                    {new Date(attempt.created_at).toLocaleDateString()}
                  </small>
                </div>
                <strong>
                  {attempt.score}/{attempt.total}
                </strong>
              </article>
            ))}
          </div>
        ) : (
          <p className="empty-note">
            No activity yet. This space fills with your completed practice, not
            sample statistics.
          </p>
        )}
      </section>
    </div>
  );
}
