"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  ShieldCheck,
  BookOpen,
  FileText,
  Users,
  Settings,
  History,
  LayoutDashboard,
} from "lucide-react";
import { saveContent, setStudentRole } from "@/app/admin/actions";
import { AdminQuestionEditor } from "@/components/admin-question-editor";
export type AdminRow = { id: string; [key: string]: unknown };
export type AdminData = {
  courses: AdminRow[];
  lessons: AdminRow[];
  records: AdminRow[];
  students: AdminRow[];
  audit: AdminRow[];
  errors: string[];
  questions: AdminRow[];
};
const sections = [
  { name: "Overview", icon: LayoutDashboard },
  { name: "Courses", icon: BookOpen },
  { name: "Lectures", icon: FileText },
  { name: "Questions", icon: FileText },
  { name: "Resources", icon: FileText },
  { name: "Students", icon: Users },
  { name: "Audit log", icon: History },
  { name: "Settings", icon: Settings },
];
const fields: Record<
  string,
  { name: string; label: string; type?: string; required?: boolean }[]
> = {
  courses: [
    { name: "code", label: "Course code", required: true },
    { name: "title", label: "Course title", required: true },
    { name: "description", label: "Description", type: "textarea" },
    { name: "accent", label: "Accent color", type: "color" },
    { name: "sort_order", label: "Display order", type: "number" },
  ],
  lessons: [
    { name: "title", label: "Lecture title", required: true },
    { name: "course_id", label: "Course", type: "course", required: true },
    {
      name: "summary",
      label: "Reading / lecture notes",
      type: "textarea",
      required: true,
    },
    { name: "video_url", label: "YouTube video URL", type: "url" },
    { name: "thumbnail_url", label: "Thumbnail URL", type: "url" },
    { name: "position", label: "Lesson order", type: "number", required: true },
  ],
  content_records: [
    { name: "title", label: "Title", required: true },
    { name: "kind", label: "Resource type", type: "kind" },
    { name: "course_code", label: "Course code (optional)" },
    { name: "body", label: "Content / configuration notes", type: "textarea" },
  ],
};
export function AdminConsole({ data }: { data: AdminData }) {
  const router = useRouter();
  const [section, setSection] = useState("Overview"),
    [query, setQuery] = useState(""),
    [editing, setEditing] = useState<AdminRow | null | undefined>(undefined),
    [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false);
  const table =
    section === "Courses"
      ? "courses"
      : section === "Lectures"
        ? "lessons"
        : "content_records";
  const rows =
    section === "Courses"
      ? data.courses
      : section === "Lectures"
        ? data.lessons
        : section === "Students"
          ? data.students
          : section === "Audit log"
            ? data.audit
            : data.records.filter((row) =>
                section === "Settings"
                  ? row.kind === "setting"
                  : row.kind !== "setting",
              );
  const visible = rows.filter((row) =>
    JSON.stringify(row).toLowerCase().includes(query.toLowerCase()),
  );
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    const input = Object.fromEntries(new FormData(event.currentTarget));
    const result = await saveContent(table, editing?.id || null, input);
    setMessage(result.message);
    setBusy(false);
    if (result.ok) {
      setEditing(undefined);
      router.refresh();
    }
  }
  async function role(row: AdminRow) {
    setBusy(true);
    const result = await setStudentRole(
      row.id,
      row.role === "admin" ? "student" : "admin",
    );
    setBusy(false);
    setMessage(result.message);
    if (result.ok) router.refresh();
  }
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar workspace-panel">
        <div>
          <span className="section-kicker">OPERATIONS</span>
          <h2>Control center</h2>
        </div>
        <nav>
          {sections.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={section === name ? "active" : ""}
              onClick={() => {
                setSection(name);
                setEditing(undefined);
                setQuery("");
                setMessage("");
              }}
            >
              <Icon size={16} />
              {name}
            </button>
          ))}
        </nav>
        <div className="admin-mode">
          <ShieldCheck size={16} />
          <span>
            <strong>Live database</strong>
            <small>Role checks + audit history</small>
          </span>
        </div>
      </aside>
      <section className="admin-main">
        {data.errors.length ? (
          <p className="error-note" role="alert">
            Some records could not be loaded: {data.errors.join(", ")}. Refresh
            to retry.
          </p>
        ) : null}
        {message ? (
          <p role="status" className="admin-feedback">
            {message}
          </p>
        ) : null}
        {section === "Questions" ? (
          <AdminQuestionEditor rows={data.questions} />
        ) : section === "Overview" ? (
          <>
            <div className="admin-metrics">
              {[
                { label: "Courses", value: data.courses.length },
                {
                  label: "Published readings",
                  value: data.lessons.filter((l) => l.status === "published")
                    .length,
                },
                { label: "Student accounts", value: data.students.length },
                { label: "Audit entries loaded", value: data.audit.length },
              ].map((item) => (
                <article key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
            <section className="workspace-panel admin-overview">
              <span className="section-kicker">PUBLISHING WORKFLOW</span>
              <h2>Draft → Review → Publish</h2>
              <p>
                Create a course, add lectures with notes and YouTube links, then
                publish when the material is ready. Students see published
                material immediately.
              </p>
              <h3>September 10 video release</h3>
              <p>
                {data.lessons.filter((l) => Boolean(l.video_url)).length}{" "}
                lectures currently have a video link. The target is eight
                recordings. Uploads to YouTube happen in the channel; paste the
                finished URLs into Lectures here.
              </p>
              <h3>Question authoring</h3>
              <p>
                Use Questions to edit answers and explanations, review drafts,
                and publish new practice material. Ranked keys stay in a separate
                private library.
              </p>
            </section>
          </>
        ) : (
          <section className="workspace-panel admin-table">
            <div className="panel-heading">
              <h2>{section}</h2>
              {!["Students", "Audit log"].includes(section) ? (
                <button
                  className="run-button"
                  onClick={() => {
                    setEditing(null);
                    setMessage("");
                  }}
                >
                  <Plus size={15} /> Add{" "}
                  {section === "Lectures" ? "lecture" : "record"}
                </button>
              ) : null}
            </div>
            <label className="search-field">
              <Search size={15} />
              <input
                aria-label={`Search ${section}`}
                placeholder="Search these records"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            {editing !== undefined ? (
              <form
                className="admin-form"
                key={editing?.id || "new"}
                onSubmit={submit}
              >
                <h3>
                  {editing ? "Edit" : "Create"} {section.toLowerCase()}
                </h3>
                {fields[table].map((field) => (
                  <label key={field.name}>
                    {field.label}
                    {field.type === "textarea" ? (
                      <textarea
                        name={field.name}
                        defaultValue={String(editing?.[field.name] || "")}
                        required={field.required}
                        rows={field.name === "summary" ? 14 : 6}
                      />
                    ) : field.type === "course" ? (
                      <select
                        name={field.name}
                        defaultValue={String(
                          editing?.[field.name] || data.courses[0]?.id || "",
                        )}
                        required
                      >
                        {data.courses.map((c) => (
                          <option key={c.id} value={c.id}>
                            {String(c.code)} · {String(c.title)}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "kind" ? (
                      <select
                        name="kind"
                        defaultValue={String(
                          editing?.kind ||
                            (section === "Settings" ? "setting" : "resource"),
                        )}
                      >
                        {[
                          "resource",
                          "announcement",
                          "schedule",
                          "question",
                          "setting",
                        ].map((kind) => (
                          <option key={kind}>{kind}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        name={field.name}
                        type={field.type || "text"}
                        required={field.required}
                        defaultValue={String(
                          editing?.[field.name] ||
                            (field.type === "color"
                              ? "#f43f6d"
                              : field.name === "position"
                                ? 1
                                : ""),
                        )}
                      />
                    )}
                  </label>
                ))}
                <label>
                  Publication status
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
                  <button className="button button-primary" disabled={busy}>
                    {busy ? "Saving…" : "Save changes"}
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
              <div className="admin-record-list">
                {visible.length ? (
                  visible.map((row) => (
                    <article key={row.id}>
                      {section === "Students" ? (
                        <>
                          <div>
                            <strong>{String(row.display_name)}</strong>
                            <small>
                              {String(row.email)} · {String(row.role)}
                            </small>
                          </div>
                          <button disabled={busy} onClick={() => role(row)}>
                            {row.role === "admin"
                              ? "Make student"
                              : "Make admin"}
                          </button>
                        </>
                      ) : section === "Audit log" ? (
                        <details>
                          <summary>
                            {String(row.action)} · {String(row.entity_type)} ·{" "}
                            {new Date(String(row.created_at)).toLocaleString()}
                          </summary>
                          <pre>{JSON.stringify(row.details, null, 2)}</pre>
                          <small>
                            Actor: {String(row.actor_id || "System")}
                          </small>
                        </details>
                      ) : (
                        <>
                          <div>
                            <strong>{String(row.title)}</strong>
                            <small>
                              {String(row.code || row.kind || "Lecture")} ·{" "}
                              {String(row.status)}
                            </small>
                          </div>
                          <button onClick={() => setEditing(row)}>Edit</button>
                        </>
                      )}
                    </article>
                  ))
                ) : (
                  <p className="empty-note">No matching records.</p>
                )}
              </div>
            )}
          </section>
        )}
      </section>
    </div>
  );
}
