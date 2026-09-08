"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { saveQuestion } from "@/app/admin/actions";
import { quizSubjects } from "@/lib/question-bank";
import type { AdminRow } from "@/components/admin-console";
export function AdminQuestionEditor({ rows }: { rows: AdminRow[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<AdminRow | null | undefined>(
      undefined,
    ),
    [query, setQuery] = useState(""),
    [busy, setBusy] = useState(false),
    [message, setMessage] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    const result = await saveQuestion(
      editing?.id || null,
      Object.fromEntries(new FormData(event.currentTarget)),
    );
    setMessage(result.message);
    setBusy(false);
    if (result.ok) {
      setEditing(undefined);
      router.refresh();
    }
  }
  return (
    <section className="workspace-panel admin-table">
      <div className="panel-heading">
        <h2>Practice questions · {rows.length}</h2>
        <button className="run-button" onClick={() => setEditing(null)}>
          <Plus size={15} /> New question
        </button>
      </div>
      {message ? (
        <p role="status" className="admin-feedback">
          {message}
        </p>
      ) : null}
      {editing !== undefined ? (
        <form
          className="admin-form"
          key={editing?.id || "new"}
          onSubmit={submit}
        >
          <label>
            Question
            <textarea
              name="title"
              required
              maxLength={2000}
              defaultValue={String(editing?.title || "")}
            />
          </label>
          <label>
            Subject
            <select
              name="subject"
              defaultValue={String(editing?.subject || quizSubjects[0])}
            >
              {quizSubjects.map((subject) => (
                <option key={subject}>{subject}</option>
              ))}
            </select>
          </label>
          <label>
            Topic
            <input
              name="topic"
              required
              maxLength={100}
              defaultValue={String(editing?.topic || "")}
            />
          </label>
          <label>
            Four answer options, one per line
            <textarea
              rows={5}
              name="options"
              required
              defaultValue={
                Array.isArray(editing?.options)
                  ? editing.options.join("\n")
                  : ""
              }
            />
          </label>
          <label>
            Correct option
            <select name="correct" defaultValue={String(editing?.correct ?? 0)}>
              {["A · first", "B · second", "C · third", "D · fourth"].map(
                (label, i) => (
                  <option key={i} value={i}>
                    {label}
                  </option>
                ),
              )}
            </select>
          </label>
          <label>
            Explanation
            <textarea
              name="explanation"
              required
              rows={5}
              defaultValue={String(editing?.explanation || "")}
            />
          </label>
          <label>
            Status
            <select
              name="status"
              defaultValue={String(editing?.status || "draft")}
            >
              <option>draft</option>
              <option>published</option>
              <option>archived</option>
            </select>
          </label>
          <div className="hero-actions">
            <button disabled={busy} className="button button-primary">
              {busy ? "Saving…" : "Save question"}
            </button>
            <button
              type="button"
              className="button button-secondary"
              onClick={() => setEditing(undefined)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <label className="search-field">
            <input
              aria-label="Search question library"
              placeholder="Search by question, subject, or topic"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <div className="admin-record-list">
            {rows
              .filter((row) =>
                `${row.title} ${row.subject} ${row.topic}`
                  .toLowerCase()
                  .includes(query.toLowerCase()),
              )
              .map((row) => (
                <article key={row.id}>
                  <div>
                    <strong>{String(row.title)}</strong>
                    <small>
                      {String(row.subject)} · {String(row.topic)} ·{" "}
                      {String(row.status)}
                    </small>
                  </div>
                  <button onClick={() => setEditing(row)}>Edit</button>
                </article>
              ))}
          </div>
        </>
      )}
    </section>
  );
}
