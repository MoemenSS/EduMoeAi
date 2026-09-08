import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";

import { AppearanceControls } from "@/components/appearance-controls";

const links = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Courses", href: "/courses" },
  { label: "Practice", href: "/quizzes" },
  { label: "Labs", href: "/simulators" },
  { label: "Ranked", href: "/ranked" },
  { label: "About", href: "/about" },
];

export function SiteHeader() {
  return (
    <header className="site-header shell">
      <Link href="/" className="brand-link">
        <BrandMark />
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <AppearanceControls />
        <Link className="header-cta" href="/moeai">
          Ask MoeAI <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
      <details className="mobile-nav">
        <summary aria-label="Open navigation">
          <Menu size={20} aria-hidden="true" />
        </summary>
        <nav aria-label="Mobile navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Link href="/moeai">Ask MoeAI</Link>
        </nav>
      </details>
    </header>
  );
}
