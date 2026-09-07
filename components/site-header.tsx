import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";

const links = [
  { label: "Courses", href: "/courses" },
  { label: "MoeAI", href: "/#moeai" },
  { label: "How it works", href: "/#how-it-works" },
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

      <Link className="header-cta" href="/courses">
        Start learning <ArrowUpRight size={15} aria-hidden="true" />
      </Link>

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
          <Link href="/courses">Start learning</Link>
        </nav>
      </details>
    </header>
  );
}
