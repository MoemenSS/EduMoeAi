"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, ChevronRight, RotateCcw, Sparkles, Timer } from "lucide-react";
import { type QuizQuestion } from "@/lib/question-bank";
import { saveLocalAttempt, shuffle, type Attempt } from "@/lib/learning";
import { createClient } from "@/lib/supabase/client";

export function QuizStudio({
  bank: questionBank,
  userId,
}: {
  bank: QuizQuestion[];
  userId: string | null;
}) {
  const quizSubjects = [...new Set(questionBank.map((q) => q.subject))];
  const [subject, setSubject] = useState("Mixed review");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0),
    [choice, setChoice] = useState<number | null>(null),
    [checked, setChecked] = useState(false),
    [done, setDone] = useState(false);
  const [answers, setAnswers] = useState<Attempt["answers"]>([]),
    [saveStatus, setSaveStatus] = useState("");
  const current = questions[index];
  const pool =
    subject === "Mixed review"
      ? questionBank
      : questionBank.filter((q) => q.subject === subject);
  const score = answers.filter((a) => a.correct).length;
  function start() {
    setQuestions(
      shuffle(pool)
        .slice(0, 10)
        .map((q) => {
          const options = shuffle(
            q.options.map((label, i) => ({ label, correct: i === q.correct })),
          );
          return {
            ...q,
            options: options.map((o) => o.label) as QuizQuestion["options"],
            correct: options.findIndex((o) => o.correct),
          };
        }),
    );
    setAnswers([]);
    setIndex(0);
    setChoice(null);
    setChecked(false);
    setDone(false);
    setSaveStatus("");
  }
  async function next() {
    if (!checked) {
      setAnswers((rows) => [
        ...rows,
        {
          id: current.id,
          topic: current.topic,
          subject: current.subject,
          correct: choice === current.correct,
        },
      ]);
      setChecked(true);
      return;
    }
    if (index < questions.length - 1) {
      setIndex(index + 1);
      setChoice(null);
      setChecked(false);
      return;
    }
    setDone(true);
    const attempt: Attempt = {
      id: crypto.randomUUID(),
      subject,
      score,
      total: questions.length,
      answers,
      created_at: new Date().toISOString(),
    };
    saveLocalAttempt(attempt, userId);
    setSaveStatus("Saved on this device.");
    try {
      const db = createClient();
      const {
        data: { user },
      } = await db.auth.getUser();
      if (user) {
        const { error } = await db
          .from("quiz_attempts")
          .insert({ ...attempt, user_id: user.id });
        setSaveStatus(
          error
            ? "Saved on this device. Cloud sync failed; your result is still available here."
            : "Saved to your account and this device.",
        );
      }
    } catch {
      setSaveStatus("Saved on this device. Sign in to sync future attempts.");
    }
  }
  if (done)
    return (
      <section className="quiz-result glass-panel">
        <Sparkles size={25} />
        <span className="section-kicker">Session complete</span>
        <h2>
          {score} / {questions.length}
        </h2>
        <p role="status">{saveStatus}</p>
        <p>
          Your dashboard now uses this result to calculate accuracy and suggest
          what to review.
        </p>
        <div className="hero-actions">
          <button className="button button-primary" onClick={start}>
            <RotateCcw size={15} /> New question set
          </button>
          <Link className="button button-secondary" href="/dashboard">
            See your learning signals
          </Link>
        </div>
      </section>
    );
  return (
    <div className="quiz-layout">
      <aside className="quiz-setup workspace-panel">
        <span className="section-kicker">Practice library</span>
        <h2>{questionBank.length} questions & variations</h2>
        <p className="quiz-library-note">
          64 authored concept questions and 192 numerical variations across
          eight subjects. Both questions and answer order are shuffled.
        </p>
        <label className="quiz-subject-label">
          Subject
          <select
            disabled={questions.length > 0}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option>Mixed review</option>
            {quizSubjects.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </label>
        <div className="quiz-meta-row">
          <span>
            <Timer size={15} /> At your pace
          </span>
          <span>{pool.length} available</span>
        </div>
        {questions.length > 0 ? (
          <>
            <div className="quiz-progress-list">
              {questions.map((q, i) => (
                <div
                  className={
                    i === index ? "active" : i < index ? "complete" : ""
                  }
                  key={q.id}
                >
                  <span>{i < index ? <Check size={12} /> : i + 1}</span>
                  <div>
                    <strong>{q.subject}</strong>
                    <small>{q.topic}</small>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="reset-link"
              onClick={() => {
                setQuestions([]);
                setAnswers([]);
              }}
            >
              Leave this practice set
            </button>
          </>
        ) : null}
      </aside>
      <section className="quiz-runner glass-panel">
        {current ? (
          <>
            <header>
              <span>
                {current.subject} · {current.topic}
              </span>
            </header>
            <div className="question-count">
              Question {index + 1} of {questions.length}
            </div>
            <h1>{current.prompt}</h1>
            <div className="answer-grid">
              {current.options.map((option, i) => (
                <button
                  disabled={checked}
                  className={
                    checked
                      ? i === current.correct
                        ? "correct"
                        : choice === i
                          ? "incorrect"
                          : ""
                      : choice === i
                        ? "selected"
                        : ""
                  }
                  key={i}
                  onClick={() => setChoice(i)}
                >
                  <span>{String.fromCharCode(65 + i)}</span>
                  {option}
                </button>
              ))}
            </div>
            {checked ? (
              <div className="quiz-explanation" role="status">
                <strong>
                  {choice === current.correct ? "Correct. " : "Not quite. "}
                </strong>
                {current.explanation}
              </div>
            ) : null}
            <footer>
              <small>{score} correct so far</small>
              <button disabled={choice === null} onClick={next}>
                {checked
                  ? index === questions.length - 1
                    ? "See results"
                    : "Next question"
                  : "Check answer"}
                <ChevronRight size={16} />
              </button>
            </footer>
          </>
        ) : (
          <div className="quiz-intro">
            <span className="section-kicker">MAKE THE IDEA STICK</span>
            <h1>
              A fresh set.
              <br />A little more clarity.
            </h1>
            <p>
              Ten questions, clear explanations, and useful feedback. Choose a
              subject or mix things up.
            </p>
            <button className="button button-primary" onClick={start}>
              Start practice <ChevronRight size={16} />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
