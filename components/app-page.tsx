import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

type AppPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  meta?: ReactNode;
  children: ReactNode;
  wide?: boolean;
};

export function AppPage({ eyebrow, title, description, meta, children, wide = false }: AppPageProps) {
  return (
    <main>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <SiteHeader />
      <section className={`workspace-hero shell ${wide ? "workspace-hero-wide" : ""}`}>
        <Link className="back-link" href="/"><ArrowLeft size={15} aria-hidden="true" /> EduMoe home</Link>
        <span className="section-kicker">{eyebrow}</span>
        <div className="workspace-heading-row">
          <div><h1>{title}</h1><p>{description}</p></div>
          {meta ? <div className="workspace-meta">{meta}</div> : null}
        </div>
      </section>
      <div className={`shell workspace-body ${wide ? "workspace-body-wide" : ""}`}>{children}</div>
    </main>
  );
}

