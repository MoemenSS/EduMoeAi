"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
export function ProfileSettings({
  userId,
  displayName,
  isPublic,
}: {
  userId: string;
  displayName: string;
  isPublic: boolean;
}) {
  const [name, setName] = useState(displayName),
    [visible, setVisible] = useState(isPublic),
    [busy, setBusy] = useState(false),
    [message, setMessage] = useState("");
  async function save(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    try {
      const { error } = await createClient()
        .from("profiles")
        .upsert(
          { user_id: userId, display_name: name.trim(), is_public: visible },
          { onConflict: "user_id" },
        );
      setMessage(
        error
          ? "Could not save. Please try again."
          : "Profile saved. Your leaderboard visibility is updated.",
      );
    } catch {
      setMessage("Connection interrupted. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="workspace-panel profile-settings">
      <span className="section-kicker">YOUR STUDENT PROFILE</span>
      <h2>Your name. Your choice.</h2>
      <form onSubmit={save}>
        <label>
          Display name
          <input
            required
            minLength={2}
            maxLength={40}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="profile-optin">
          <input
            type="checkbox"
            checked={visible}
            onChange={(e) => setVisible(e.target.checked)}
          />
          Show my display name and ranked results on the student ladder
        </label>
        <button className="button button-secondary" disabled={busy}>
          {busy ? "Saving…" : "Save profile"}
        </button>
        <p role="status">{message}</p>
      </form>
    </section>
  );
}
