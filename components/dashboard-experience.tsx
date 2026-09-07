"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, BrainCircuit, CalendarDays, Check, Flame, Trophy, Zap } from "lucide-react";
import { courseProgress } from "@/lib/courses";

type ProgressRow = { course_code: string; current_lesson: string | null; percent: number };

const schedule = [
  { time: "Today · 10:00", title: "Probability checkpoint", note: "5 questions · 8 minutes" },
  { time: "Friday", title: "Logic assignment", note: "K-map simplification" },
  { time: "Next week", title: "C++ lab", note: "Pointers & arrays" },
];

export function DashboardExperience({ progressRows = [], connected = false }: { progressRows?: ProgressRow[]; connected?: boolean }) {
  const [completed, setCompleted] = useState<string[]>([]);
  const progress = progressRows.length ? courseProgress.map((course) => {
    const saved = progressRows.find((row) => row.course_code === course.code);
    return saved ? { ...course, progress: saved.percent, next: saved.current_lesson || course.next } : course;
  }) : courseProgress;
  return (
    <div className="dashboard-grid">
      <section className="focus-card glass-panel">
        <div className="focus-card-top"><span className="status-dot"><Flame size={14} /> Today&apos;s focus</span><span>{connected ? "Supabase synced" : "Local preview"}</span></div>
        <div><span className="section-kicker">Differential Equations · Unit 2</span><h2>Separable equations</h2><p>Continue from the worked example and finish the three-question check.</p></div>
        <div className="focus-progress"><span style={{ width: "68%" }} /></div>
        <div className="focus-actions"><Link className="button button-primary" href="/lecture">Continue lesson <ArrowRight size={16} /></Link><Link className="button button-secondary" href="/quizzes">Quick practice</Link></div>
      </section>

      <section className="metric-stack" aria-label="Learning statistics">
        <article><Zap size={17} /><strong>1,240</strong><span>Learning XP</span></article>
        <article><Flame size={17} /><strong>14 days</strong><span>Current streak</span></article>
        <article><Trophy size={17} /><strong>Top 12%</strong><span>This semester</span></article>
      </section>

      <section className="workspace-panel progress-panel">
        <div className="panel-heading"><div><span className="section-kicker">Course momentum</span><h2>Keep the signal moving.</h2></div><Link href="/courses">All courses <ArrowRight size={15} /></Link></div>
        <div className="progress-list">
          {progress.map((course) => <article key={course.code}><div><span>{course.code}</span><strong>{course.name}</strong><small>Next: {course.next}</small></div><div className="progress-value"><strong>{course.progress}%</strong><span><i style={{ width: `${course.progress}%` }} /></span></div></article>)}
        </div>
      </section>

      <section className="workspace-panel recommendation-panel">
        <div className="panel-heading"><div><span className="section-kicker">MoeAI signals</span><h2>Recommended for you.</h2></div><BrainCircuit size={20} /></div>
        <div className="recommendation-list">
          <Link href="/simulators"><span><BrainCircuit size={17} /></span><div><strong>Untangle K-maps visually</strong><small>Logic Design · based on your last quiz</small></div><ArrowRight size={16} /></Link>
          <Link href="/quizzes"><span><BookOpenCheck size={17} /></span><div><strong>Review Poisson distribution</strong><small>2 attempts · concept needs attention</small></div><ArrowRight size={16} /></Link>
        </div>
      </section>

      <section className="workspace-panel schedule-panel">
        <div className="panel-heading"><div><span className="section-kicker">Upcoming</span><h2>Your next three.</h2></div><CalendarDays size={20} /></div>
        <div className="schedule-list">
          {schedule.map((item) => { const done = completed.includes(item.title); return <button className={done ? "done" : ""} key={item.title} onClick={() => setCompleted((items) => done ? items.filter((value) => value !== item.title) : [...items, item.title])}><span className="schedule-check">{done ? <Check size={14} /> : null}</span><span><small>{item.time}</small><strong>{item.title}</strong><em>{item.note}</em></span></button>; })}
        </div>
      </section>
    </div>
  );
}
