"use client";

import React from "react";
import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/States";

type NewsItem = { id: string; title: string; source: string; symbol?: string; time: string };

export default function NewsPage() {
  const [items] = React.useState<NewsItem[]>([
    { id: "n1", title: "Market news feed UI placeholder", source: "Provider", time: "—" },
    { id: "n2", title: "Open a quote to see per-ticker news", source: "Provider", symbol: "AAPL", time: "—" },
  ]);

  return (
    <AppShell title="News" subtitle="Latest market and per-ticker news.">
      {items.length === 0 ? (
        <EmptyState title="No news yet" message="When backend endpoints are available, news will appear here." />
      ) : (
        <section className="mi-card" aria-label="News feed">
          <div className="mi-card-header">
            <div>
              <div className="mi-title">Headlines</div>
              <p className="mi-subtitle">Filter and deep-link to ticker quotes when available.</p>
            </div>
            <button className="mi-btn" onClick={() => alert("Filter UI (placeholder).")}>
              Filter
            </button>
          </div>

          <div className="mi-list">
            {items.map((n) => (
              <div key={n.id} className="mi-list-item">
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 650, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {n.title}
                  </div>
                  <div className="mi-help">
                    {n.source}
                    {n.symbol ? ` • ${n.symbol}` : ""} • {n.time}
                  </div>
                </div>
                <button className="mi-btn" onClick={() => alert("Open story (placeholder).")}>
                  Open
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </AppShell>
  );
}
