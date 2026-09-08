"use client";
import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUp,
  BookOpenCheck,
  BrainCircuit,
  Plus,
  Sparkles,
} from "lucide-react";
import { readLocalAttempts, summarize, type Attempt } from "@/lib/learning";
import type { Lesson } from "@/lib/catalog";
type Message = {
  role: "student" | "moe";
  text: string;
  source?: { id: string; title: string };
};
export function MoeAiChat({
  lessons,
  attempts,
  course,
  title,
  userId,
}: {
  lessons: Lesson[];
  attempts: Attempt[];
  course: string;
  title: string;
  userId: string | null;
}) {
  const [input, setInput] = useState(""),
    [local, setLocal] = useState<Attempt[]>([]),
    [messages, setMessages] = useState<Message[]>([
      {
        role: "moe",
        text: `You’re in ${title}. Search the published notes, or ask for your progress and review priorities. This workspace currently uses course notes and calculated learning signals; a generative model is not connected yet.`,
      },
    ]);
  useEffect(() => {
    const id = requestAnimationFrame(() => setLocal(readLocalAttempts(userId)));
    return () => cancelAnimationFrame(id);
  }, [userId]);
  const stats = summarize([
    ...new Map([...local, ...attempts].map((a) => [a.id, a])).values(),
  ]);
  function send(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;
    let reply: Message;
    if (/progress|accuracy|streak|weak|review|recommend/i.test(text)) {
      reply = {
        role: "moe",
        text: stats.total
          ? `You have answered ${stats.total} questions with ${stats.accuracy}% accuracy. Your study streak is ${stats.streak} day(s). ${stats.weaknesses.length ? `Review next: ${stats.weaknesses.map((w) => `${w.topic} (${w.accuracy}%)`).join("; ")}.` : "No weak topics appear in your recorded answers yet."}`
          : "There are no completed practice results yet. Finish a set in Practice, then return to see your accuracy and review priorities.",
      };
    } else {
      const words = text
        .toLowerCase()
        .split(/\W+/)
        .filter((w) => w.length > 3);
      const passages = lessons
        .flatMap((lesson) =>
          lesson.summary.split(/\n\n/).map((p) => ({
            lesson,
            p,
            score: words.reduce(
              (sum, w) => sum + (p.toLowerCase().includes(w) ? 1 : 0),
              0,
            ),
          })),
        )
        .sort((a, b) => b.score - a.score);
      const best = passages[0];
      reply =
        best && best.score > 0
          ? {
              role: "moe",
              text: `From your published course notes:\n\n${best.p}`,
              source: { id: best.lesson.id, title: best.lesson.title },
            }
          : {
              role: "moe",
              text: "I could not find a matching passage in this course’s published notes. Try a concept from the lesson title, choose another course, or open the lab to explore an example. I won’t invent a course-specific explanation.",
            };
    }
    setMessages((rows) => [...rows, { role: "student", text }, reply]);
    setInput("");
  }
  return (
    <div className="moe-workspace glass-panel">
      <aside className="moe-sidebar">
        <div className="moe-side-title">
          <span className="ai-orb">
            <Sparkles size={16} />
          </span>
          <div>
            <strong>MoeAI</strong>
            <small>Learning context</small>
          </div>
        </div>
        <button
          className="new-chat"
          onClick={() =>
            setMessages([
              {
                role: "moe",
                text: "Search a concept in the published notes or ask for your progress.",
              },
            ])
          }
        >
          <Plus size={15} /> Clear conversation
        </button>
        <div className="context-card">
          <span>Active course</span>
          <strong>
            {course} · {title}
          </strong>
          <small>{lessons.length} published readings</small>
          <Link href="/courses">Change course →</Link>
        </div>
        <div className="context-card">
          <BrainCircuit size={18} />
          <span>Your learning signal</span>
          <strong>
            {stats.total ? `${stats.accuracy}% accuracy` : "No practice yet"}
          </strong>
          <small>{stats.total} questions answered</small>
          <Link href="/dashboard">Open dashboard →</Link>
        </div>
        <Link className="mode" href="/quizzes">
          <BookOpenCheck size={15} /> Practice a concept
        </Link>
      </aside>
      <section className="moe-thread">
        <header>
          <div>
            <span className="section-kicker">
              COURSE NOTES + LEARNING SIGNALS
            </span>
            <h1>Start with what you know.</h1>
          </div>
          <span className="online-pill">Notes mode</span>
        </header>
        <div className="message-list" aria-live="polite">
          {messages.map((message, i) => (
            <div className={`full-message ${message.role}`} key={i}>
              {message.role === "moe" ? (
                <span className="tiny-orb">
                  <Sparkles size={12} />
                </span>
              ) : null}
              <div>
                <p>{message.text}</p>
                {message.source ? (
                  <Link
                    className="message-source"
                    href={`/lecture?course=${course}&lesson=${message.source.id}`}
                  >
                    Source: {message.source.title} →
                  </Link>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <div className="prompt-chips">
          {[
            "Show my progress",
            "What should I review?",
            lessons[0]?.title || "Find a course concept",
          ].map((prompt) => (
            <button key={prompt} onClick={() => setInput(prompt)}>
              {prompt}
            </button>
          ))}
        </div>
        <form className="moe-composer" onSubmit={send}>
          <label>
            <span className="sr-only">
              Search notes or ask for learning signals
            </span>
            <textarea
              maxLength={1000}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search your course notes, or ask what to review…"
            />
          </label>
          <button disabled={!input.trim()} aria-label="Send message">
            <ArrowUp size={17} />
          </button>
        </form>
      </section>
    </div>
  );
}
