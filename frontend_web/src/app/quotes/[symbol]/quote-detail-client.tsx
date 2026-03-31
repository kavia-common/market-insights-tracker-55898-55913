"use client";

import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { EmptyState, LoadingState } from "@/components/States";

type IndicatorConfig = {
  sma: boolean;
  ema: boolean;
  rsi: boolean;
  macd: boolean;
};

export default function QuoteDetailClient({ symbol }: { symbol: string }) {
  const [loading, setLoading] = React.useState(true);
  const [indicator, setIndicator] = React.useState<IndicatorConfig>({
    sma: true,
    ema: false,
    rsi: true,
    macd: false,
  });

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(t);
  }, [symbol]);

  return (
    <AppShell
      title={`Quote: ${symbol || "—"}`}
      subtitle="Chart, indicators, and recent news for the ticker."
      sidebar={
        <div className="mi-stack">
          <div>
            <div style={{ fontWeight: 650, marginBottom: 6 }}>Indicators</div>
            <div className="mi-help">Toggle overlays (UI wired; chart rendering placeholder).</div>
          </div>

          <label className="mi-row" style={{ justifyContent: "space-between" }}>
            <span className="mi-help">SMA</span>
            <input
              type="checkbox"
              checked={indicator.sma}
              onChange={(e) => setIndicator((p) => ({ ...p, sma: e.target.checked }))}
            />
          </label>
          <label className="mi-row" style={{ justifyContent: "space-between" }}>
            <span className="mi-help">EMA</span>
            <input
              type="checkbox"
              checked={indicator.ema}
              onChange={(e) => setIndicator((p) => ({ ...p, ema: e.target.checked }))}
            />
          </label>
          <label className="mi-row" style={{ justifyContent: "space-between" }}>
            <span className="mi-help">RSI</span>
            <input
              type="checkbox"
              checked={indicator.rsi}
              onChange={(e) => setIndicator((p) => ({ ...p, rsi: e.target.checked }))}
            />
          </label>
          <label className="mi-row" style={{ justifyContent: "space-between" }}>
            <span className="mi-help">MACD</span>
            <input
              type="checkbox"
              checked={indicator.macd}
              onChange={(e) => setIndicator((p) => ({ ...p, macd: e.target.checked }))}
            />
          </label>

          <div className="mi-divider" />
          <Link className="mi-btn mi-btn-primary" href="/alerts">
            Create alert
          </Link>
        </div>
      }
    >
      {!symbol ? (
        <EmptyState
          title="No symbol"
          message="Open a quote from a watchlist or use a direct URL like /quotes/AAPL."
          action={
            <Link className="mi-btn mi-btn-primary" href="/watchlists">
              Go to watchlists
            </Link>
          }
        />
      ) : loading ? (
        <LoadingState title={`Loading ${symbol}`} subtitle="Fetching quote + candles (placeholder)..." />
      ) : (
        <>
          <section className="mi-card" aria-label="Chart panel">
            <div className="mi-card-header">
              <div>
                <div className="mi-title">Price chart</div>
                <p className="mi-subtitle">
                  Candlestick/line chart placeholder. Indicators selected:{" "}
                  <span className="mi-mono">
                    {Object.entries(indicator)
                      .filter(([, v]) => v)
                      .map(([k]) => k.toUpperCase())
                      .join(", ") || "None"}
                  </span>
                </p>
              </div>
              <span className="mi-badge">1D</span>
            </div>

            <div
              className="mi-state"
              style={{
                height: 320,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderStyle: "solid",
              }}
            >
              Chart area (responsive)
            </div>

            <div className="mi-divider" style={{ marginTop: 12, marginBottom: 12 }} />

            <div className="mi-row" style={{ flexWrap: "wrap" }}>
              <button className="mi-btn" onClick={() => alert("Switch interval (placeholder).")}>
                Interval
              </button>
              <button className="mi-btn" onClick={() => alert("Add to watchlist (placeholder).")}>
                Add to watchlist
              </button>
              <button className="mi-btn" onClick={() => alert("Trade simulation (placeholder).")}>
                Simulate trade
              </button>
            </div>
          </section>

          <section className="mi-card" aria-label="News panel">
            <div className="mi-card-header">
              <div>
                <div className="mi-title">News</div>
                <p className="mi-subtitle">Per-ticker news feed (UI placeholder).</p>
              </div>
              <Link className="mi-btn mi-btn-ghost" href="/news">
                All news
              </Link>
            </div>

            <div className="mi-list">
              {[
                { title: `${symbol} headlines will appear here`, source: "Provider", time: "—" },
                { title: "Earnings, product, macro updates…", source: "Provider", time: "—" },
              ].map((n, idx) => (
                <div key={idx} className="mi-list-item">
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 650,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {n.title}
                    </div>
                    <div className="mi-help">
                      {n.source} • {n.time}
                    </div>
                  </div>
                  <button className="mi-btn" onClick={() => alert("Open article (placeholder).")}>
                    Open
                  </button>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </AppShell>
  );
}
