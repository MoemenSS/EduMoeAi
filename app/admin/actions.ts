"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const statusValues = new Set(["draft", "published", "archived"]);
const kinds = new Set([
  "announcement",
  "schedule",
  "resource",
  "question",
  "setting",
]);
function text(value: unknown, max: number, required = false) {
  if (
    typeof value !== "string" ||
    value.length > max ||
    (required && !value.trim())
  )
    throw Error("Check the required fields and their length.");
  return value.trim();
}
function url(value: unknown) {
  const raw = text(value, 2000);
  if (!raw) return null;
  const parsed = new URL(raw);
  if (parsed.protocol !== "https:") throw Error("Links must use HTTPS.");
  return raw;
}
async function admin() {
  const db = await createClient();
  const {
    data: { user },
  } = await db.auth.getUser();
  if (!user || user.app_metadata?.role !== "admin")
    throw Error("Administrator access required.");
  return db;
}
export async function saveContent(
  table: string,
  id: string | null,
  input: Record<string, unknown>,
) {
  try {
    const db = await admin();
    if (!["courses", "lessons", "content_records"].includes(table))
      throw Error("Unknown content type.");
    const status = text(input.status, 20, true);
    if (!statusValues.has(status)) throw Error("Invalid publication status.");
    const title = text(input.title, 200, true);
    let row: Record<string, unknown> = { title, status };
    if (table === "courses") {
      const code = text(input.code, 20, true);
      if (!/^[A-Z]{2,6}\d{2,4}$/.test(code))
        throw Error("Use a course code such as CS102.");
      row = {
        ...row,
        code,
        description: text(input.description, 2000),
        accent: /^#[0-9a-f]{6}$/i.test(String(input.accent))
          ? input.accent
          : "#f43f6d",
        sort_order: Number(input.sort_order) || 0,
      };
    }
    if (table === "lessons") {
      const position = Number(input.position);
      if (!Number.isInteger(position) || position < 1 || position > 10000)
        throw Error("Position must be a whole number from 1 to 10000.");
      row = {
        ...row,
        course_id: text(input.course_id, 36, true),
        summary: text(input.summary, 50000, true),
        video_url: url(input.video_url),
        thumbnail_url: url(input.thumbnail_url),
        position,
      };
    }
    if (table === "content_records") {
      const kind = text(input.kind, 30, true);
      if (!kinds.has(kind)) throw Error("Unknown resource kind.");
      row = {
        ...row,
        kind,
        body: text(input.body, 50000),
        course_code: text(input.course_code, 20) || null,
        updated_at: new Date().toISOString(),
      };
    }
    const query = id
      ? db.from(table).update(row).eq("id", id)
      : db.from(table).insert(row);
    const { data, error } = await query.select("id").single();
    if (error || !data)
      throw Error(
        error?.code === "23505"
          ? "That course code already exists."
          : "Content could not be saved. Check the fields and your account permissions.",
      );
    for (const path of ["/admin", "/courses", "/lecture", "/dashboard"])
      revalidatePath(path);
    return {
      ok: true,
      message: "Saved to the database. Changes are recorded in the audit log.",
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Save failed.",
    };
  }
}
export async function setStudentRole(id: string, role: string) {
  try {
    const db = await admin();
    if (!["student", "admin"].includes(role)) throw Error("Invalid role.");
    const { error } = await db.rpc("admin_set_role", {
      target_user: id,
      new_role: role,
    });
    if (error) throw Error(error.message);
    revalidatePath("/admin");
    return { ok: true, message: "Role updated and audited." };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Role update failed.",
    };
  }
}
export async function saveQuestion(
  id: string | null,
  input: Record<string, unknown>,
) {
  try {
    const db = await admin();
    const options = text(input.options, 8000, true)
      .split(/\r?\n/)
      .map((o) => o.trim())
      .filter(Boolean);
    if (options.length !== 4 || new Set(options).size !== 4)
      throw Error("Enter four distinct answer options, one per line.");
    const correct = Number(input.correct);
    if (!Number.isInteger(correct) || correct < 0 || correct > 3)
      throw Error("Choose the correct answer.");
    const status = text(input.status, 20, true);
    if (!statusValues.has(status)) throw Error("Invalid status.");
    const row = {
      title: text(input.title, 2000, true),
      subject: text(input.subject, 100, true),
      topic: text(input.topic, 100, true),
      options,
      correct,
      explanation: text(input.explanation, 8000, true),
      status,
      updated_at: new Date().toISOString(),
    };
    const query = id
      ? db.from("practice_questions").update(row).eq("id", id)
      : db.from("practice_questions").insert(row);
    const { data, error } = await query.select("id").single();
    if (error || !data) throw Error("Question could not be saved.");
    revalidatePath("/admin");
    revalidatePath("/quizzes");
    return {
      ok: true,
      message:
        "Question saved and audited. Published questions appear in new practice sets.",
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Save failed.",
    };
  }
}
