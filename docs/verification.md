# Verification — September 8, 2026

- Production build: passed (Next.js 16.3.4; rechecked after final changes).
- TypeScript and ESLint: release checks recorded in the task output.
- Desktop (1280 px) and mobile (390 px) homepage captured and visually inspected.
- Homepage code-trace control changed the displayed result; subject controls rendered real local examples.
- Mathematics course filter reduced the catalog to four subjects.
- `/lecture?course=PHY101` opened the projectile lesson, not the previous hard-coded pointers screen.
- A complete 10-question guest practice set saved its score and updated the dashboard's accuracy, streak, and weak-topic recommendations.
- Calculus `x^3` returned `3 * x ^ 2`; at x=2, f(x)=8 and slope=12. Invalid text returned an error rather than a fabricated derivative.
- Real OneCompiler editor, language picker, input/output controls, and Run button rendered in the iframe.
- Supabase transaction-only test: lesson completion idempotence; no answer leakage at challenge start; correct 10/10 server scoring; one active challenge; replay-safe submission; cross-user isolation; student admin denial.
- Supabase transaction-only admin test: account lookup; audited role changes; question insert/update audit; immediate revocation despite stale JWT claims.
- Fixture accounts and writes were rolled back. The database returned zero test accounts afterward.
- Supabase security advisor: no findings after the applied migrations. Performance advisor only reported unused indexes, expected for an empty new student database.

## Limitations

Magic-link email delivery and a real authenticated browser admin session require the user's account setup. Physical-device performance and the external simulator engines' full functionality have not been exhaustively tested. Read `release-status.md` before treating future features as delivered.
