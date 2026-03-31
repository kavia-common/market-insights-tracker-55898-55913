"use client";

import React from "react";
import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/States";
import Link from "next/link";

type Watchlist = { id: string; name: string; tickers: string[] };

export default function WatchlistsPage() {
  const [watchlists, setWatchlists] = React.useState<Watchlist[]>([
    { id: "default", name: "Main", tickers: ["AAPL", "MSFT", "TSLA"] },
  ]);

  return (
    <AppShell title="Watchlists" subtitle="Group tickers you want to monitor.">
      {watchlists.length === 0 ? (
        <EmptyState
          title="No watchlists"
          message="Create a watchlist to start tracking tickers."
          action={
            <button
              className="mi-btn mi-btn-primary"
              onClick={() => setWatchlists([{ id: "w1", name: "My Watchlist", tickers: [] }])}
            >
              Create watchlist
            </button>
          }
        />
      ) : (
        <section className="mi-card" aria-label="Watchlists list">
          <div className="mi-card-header">
            <div>
              <div className="mi-title">Your watchlists</div>
              <p className="mi-subtitle">Select a ticker to view quote details.</p>
            </div>
            <button
              className="mi-btn mi-btn-primary"
              onClick={() =>
                setWatchlists((prev) => [
                  ...prev,
                  { id: `w${prev.length + 1}`, name: `Watchlist ${prev.length + 1}`, tickers: [] },
                ])
              }
            >
              New watchlist
            </button>
          </div>

          <div className="mi-list">
            {watchlists.map((w) => (
              <div key={w.id} className="mi-list-item">
                <div>
                  <div style={{ fontWeight: 650 }}>{w.name}</div>
                  <div className="mi-help">{w.tickers.length} tickers</div>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
                  {w.tickers.slice(0, 4).map((t) => (
                    <Link key={t} className="mi-btn" href={`/quotes/${t}`}>
                      <span className="mi-mono">{t}</span>
                    </Link>
                  ))}
                  <button
                    className="mi-btn mi-btn-ghost"
                    onClick={() => alert("Edit watchlist (placeholder).")}
                  >
                    Manage
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </AppShell>
  );
}
