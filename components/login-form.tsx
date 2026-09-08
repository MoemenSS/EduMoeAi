"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function LoginForm({ nextPath }: { nextPath: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle",
  );
  async function submit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`,
      },
    });
    setStatus(error ? "error" : "sent");
  }
  return (
    <form className="login-card glass-panel" onSubmit={submit}>
      <span className="section-kicker">Passwordless access</span>
      <h1>{status === "sent" ? "Check your inbox." : "Sign in to EduMoe"}</h1>
      <p>
        {status === "sent"
          ? `A secure sign-in link was sent to ${email}.`
          : "Use the email connected to your Supabase account."}
      </p>
      {status !== "sent" ? (
        <>
          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </label>
          <button
            className="button button-primary"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <LoaderCircle className="spin" size={16} />
            ) : (
              <>
                Send secure link <ArrowRight size={16} />
              </>
            )}
          </button>
          {status === "error" ? (
            <small role="alert">
              The sign-in link could not be sent. Check the address and try
              again.
            </small>
          ) : null}
        </>
      ) : (
        <div className="login-sent">
          <Check size={18} /> You can close this tab after opening the link.
        </div>
      )}
    </form>
  );
}
