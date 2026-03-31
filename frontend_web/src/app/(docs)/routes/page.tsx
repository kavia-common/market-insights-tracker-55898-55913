import React from "react";
import { AppShell } from "@/components/AppShell";

export default function RoutesDocPage() {
  return (
    <AppShell title="App routes" subtitle="Quick reference for major pages/flows.">
      <section className="mi-card">
        <div className="mi-title">Major flows</div>
        <p className="mi-subtitle">All pages include responsive layout and basic loading/empty/error patterns.</p>
        <div className="mi-divider" style={{ marginTop: 12, marginBottom: 12 }} />
        <div className="mi-list">
          {[
            ["/", "Overview (market snapshot + backend connectivity)"],
            ["/auth/sign-in", "Authentication: sign in (placeholder)"],
            ["/auth/sign-up", "Authentication: sign up (placeholder)"],
            ["/watchlists", "Watchlists list + quick links to quotes"],
            ["/quotes/AAPL", "Quote detail with chart + indicator toggles + news panel"],
            ["/news", "News feed"],
            ["/alerts", "Alerts management"],
            ["/portfolio", "Portfolio holdings + P/L summary"],
            ["/preferences", "Preferences defaults"],
          ].map(([path, desc]) => (
            <div key={path} className="mi-list-item">
              <div>
                <div className="mi-mono" style={{ fontWeight: 700 }}>
                  {path}
                </div>
                <div className="mi-help">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
