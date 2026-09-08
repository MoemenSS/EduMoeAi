"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Swords, Trophy } from "lucide-react";
import { quizSubjects } from "@/lib/question-bank";
import { createClient } from "@/lib/supabase/client";
type Challenge = {
  id: string;
  subject: string;
  expires_at: string;
  questions: { id: string; prompt: string; options: string[]; topic: string }[];
};
type Leader = { name: string; best_score: number; rounds: number };
export function RankedArena({ userId }: { userId: string | null }) {
  const [subject, setSubject] = useState(quizSubjects[0]),
    [challenge, setChallenge] = useState<Challenge | null>(null),
    [choices, setChoices] = useState<number[]>([]),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const [result, setResult] = useState<{ score: number; total: number } | null>(
      null,
    ),
    [leaders, setLeaders] = useState<Leader[]>([]),
    [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (!userId) return;
    let active = true;
    createClient()
      .rpc("challenge_leaderboard")
      .then(({ data }) => {
        if (active && Array.isArray(data)) setLeaders(data);
      });
    return () => {
      active = false;
    };
  }, [userId, result]);
  useEffect(() => {
    if (!challenge || result) return;
    const timer = setInterval(
      () =>
        setSeconds(
          Math.max(
            0,
            Math.ceil(
              (new Date(challenge.expires_at).getTime() - Date.now()) / 1000,
            ),
          ),
        ),
      1000,
    );
    return () => clearInterval(timer);
  }, [challenge, result]);
  async function start() {
    setBusy(true);
    setError("");
    try {
      const { data, error } = await createClient().rpc("start_challenge", {
        chosen_subject: subject,
      });
      if (error) throw error;
      setChallenge(data);
      setChoices(Array(data.questions.length).fill(-1));
      setSeconds(
        Math.max(
          0,
          Math.ceil((new Date(data.expires_at).getTime() - Date.now()) / 1000),
        ),
      );
      setResult(null);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : (e as { message?: string }).message ||
              "Could not start. Try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function submit() {
    if (!challenge) return;
    setBusy(true);
    setError("");
    try {
      const { data, error } = await createClient().rpc("submit_challenge", {
        challenge_id: challenge.id,
        choices,
      });
      if (error) throw error;
      setResult(data);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : (e as { message?: string }).message ||
              "Could not submit. Try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="ranked-challenge-layout">
      <section className="arena-card workspace-panel">
        <div className="panel-heading">
          <div>
            <span className="section-kicker">VERIFIED CHALLENGES · BETA</span>
            <h2>Earn the result.</h2>
          </div>
          <Swords size={25} />
        </div>
        <p className="empty-note">
          Ten questions. Five minutes. Your answers are scored on the server.
          This is a solo challenge ladder; live head-to-head matches are still
          in development.
        </p>
        {error ? (
          <p className="error-note" role="alert">
            {error}
          </p>
        ) : null}
        {!userId ? (
          <Link href="/login?next=/ranked" className="button button-primary">
            Sign in to enter <ArrowRight size={15} />
          </Link>
        ) : result ? (
          <div className="challenge-result">
            <Trophy size={35} />
            <h2>
              {result.score} / {result.total}
            </h2>
            <p>
              Result verified and saved. Only opted-in public profiles appear on
              the ladder.
            </p>
            <button
              className="button button-primary"
              onClick={() => {
                setChallenge(null);
                setResult(null);
              }}
            >
              Choose another challenge
            </button>
          </div>
        ) : challenge ? (
          <>
            <div className="challenge-timer" aria-live="off">
              <span>{challenge.subject}</span>
              <strong>
                {Math.floor(seconds / 60)}:
                {String(seconds % 60).padStart(2, "0")}
              </strong>
            </div>
            {seconds === 0 ? (
              <div className="error-note">
                This round has expired.{" "}
                <button onClick={() => setChallenge(null)}>Start again</button>
              </div>
            ) : (
              <>
                <div className="challenge-questions">
                  {challenge.questions.map((q, i) => (
                    <fieldset key={q.id}>
                      <legend>
                        {i + 1}. {q.prompt}
                      </legend>
                      <div className="answer-grid">
                        {q.options.map((option, j) => (
                          <button
                            aria-pressed={choices[i] === j}
                            className={choices[i] === j ? "selected" : ""}
                            key={j}
                            onClick={() =>
                              setChoices((previous) =>
                                previous.map((v, k) => (k === i ? j : v)),
                              )
                            }
                          >
                            <span>{String.fromCharCode(65 + j)}</span>
                            {option}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                  ))}
                </div>
                <button
                  disabled={busy || choices.some((c) => c < 0)}
                  onClick={submit}
                  className="button button-primary"
                >
                  {busy ? "Verifying…" : "Submit answers"}
                </button>
              </>
            )}
          </>
        ) : (
          <div className="challenge-start">
            <label>
              Choose your subject
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                {quizSubjects.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <button
              disabled={busy}
              onClick={start}
              className="button button-primary"
            >
              {busy ? "Preparing…" : "Start timed challenge"}{" "}
              <ArrowRight size={15} />
            </button>
            <small>
              One active challenge at a time · up to 20 starts per day
            </small>
          </div>
        )}
      </section>
      <aside className="leaderboard workspace-panel">
        <div className="panel-heading">
          <div>
            <span className="section-kicker">STUDENT LADDER</span>
            <h2>Real attempts. Real people.</h2>
          </div>
          <Trophy size={20} />
        </div>
        {leaders.length ? (
          <div className="leader-list">
            {leaders.map((leader, i) => (
              <div key={i}>
                <span>{i + 1}</span>
                <strong>{leader.name}</strong>
                <small>
                  {leader.best_score}/10 · {leader.rounds} rounds
                </small>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-note">
            {userId
              ? "No public results yet. Complete a challenge to start the ladder."
              : "Sign in to see the student ladder."}
          </p>
        )}
        <p className="empty-note">
          Ranked by best verified score, then completed rounds. Self-reported
          practice scores do not count here.
        </p>
      </aside>
    </div>
  );
}
