import type { Metadata } from "next";
import { LoginForm } from "@/components/login-form";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = { title: "Sign in" };
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const nextPath =
    next?.startsWith("/") && !next.startsWith("//") && !next.includes("\\")
      ? next
      : "/dashboard";
  return (
    <main>
      <SiteHeader />
      <section className="login-shell shell">
        <LoginForm nextPath={nextPath} />
      </section>
    </main>
  );
}
