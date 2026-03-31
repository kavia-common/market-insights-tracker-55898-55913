import Link from "next/link";
import React from "react";

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link className="mi-btn mi-btn-ghost" href={href}>
      {label}
    </Link>
  );
}

export function AppShell({
  title,
  subtitle,
  children,
  sidebar,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}) {
  return (
    <div className="mi-page">
      <header className="mi-header">
        <div className="mi-header-inner">
          <div className="mi-brand">
            <span>Market Insights</span>
            <span className="mi-pill">Tracker</span>
          </div>
          <nav aria-label="Primary navigation" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <NavLink href="/" label="Overview" />
            <NavLink href="/watchlists" label="Watchlists" />
            <NavLink href="/news" label="News" />
            <NavLink href="/alerts" label="Alerts" />
            <NavLink href="/portfolio" label="Portfolio" />
            <NavLink href="/preferences" label="Preferences" />
            <NavLink href="/auth/sign-in" label="Sign in" />
          </nav>
        </div>
      </header>

      <div className="mi-shell">
        <aside className="mi-sidebar" aria-label="Sidebar">
          <div className="mi-card">
            <div className="mi-card-header">
              <div>
                <div className="mi-title">{title}</div>
                {subtitle ? <p className="mi-subtitle">{subtitle}</p> : null}
              </div>
              <span className="mi-badge">Beta</span>
            </div>
            <div className="mi-stack">
              <Link className="mi-btn mi-btn-primary" href="/watchlists">
                Open watchlists
              </Link>
              <Link className="mi-btn" href="/portfolio">
                View portfolio
              </Link>
              <Link className="mi-btn" href="/news">
                Read news
              </Link>
            </div>
          </div>

          {sidebar ? <div className="mi-card">{sidebar}</div> : null}
        </aside>

        <main className="mi-main" aria-label="Main content">
          {children}
        </main>
      </div>
    </div>
  );
}
