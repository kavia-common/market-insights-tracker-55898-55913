"use client";

import React from "react";
import { AppShell } from "@/components/AppShell";
import { apiClient, ApiError } from "@/lib/api/client";
import { ErrorState, LoadingState } from "@/components/States";
import Link from "next/link";

export default function Home() {
  const [state, setState] = React.useState<
    | { kind: "loading" }
    | { kind: "ready"; data: unknown }
    | { kind: "error"; message: string }
  >({ kind: "loading" });

  React.useEffect(() => {
    const ctrl = new AbortController();
    apiClient
      .healthCheck(ctrl.signal)
      .then((data) => setState({ kind: "ready", data }))
      .catch((e: unknown) => {
        const message =
          e instanceof ApiError
            ? `Backend unavailable (HTTP ${e.status}). Check NEXT_PUBLIC_API_BASE_URL.`
            : "Backend unavailable. Check configuration.";
        setState({ kind: "error", message });
      });
    return () => ctrl.abort();
  }, []);

  return (
    <AppShell title="Overview" subtitle="Market overview, quick actions, and system status.">
      {state.kind === "loading" ? (
        <LoadingState title="Loading overview" subtitle="Checking backend connectivity…" />
      ) : state.kind === "error" ? (
        <ErrorState
          message={state.message}
          action={
            <Link className="mi-btn mi-btn-primary" href="/auth/sign-in">
              Continue to sign in
            </Link>
          }
        />
      ) : (
        <>
          <section className="mi-card" aria-label="Market overview">
            <div className="mi-card-header">
              <div>
                <div className="mi-title">Market snapshot</div>
                <p className="mi-subtitle">Top movers and breadth (placeholder UI until backend endpoints land).</p>
              </div>
              <span className="mi-badge-success">Connected</span>
            </div>

            <div className="mi-kpi">
              <div className="mi-kpi-tile">
                <div className="mi-kpi-label">Backend health payload</div>
                <div className="mi-kpi-value mi-mono">
                  {typeof state.data === "string" ? state.data : JSON.stringify(state.data)}
                </div>
              </div>
              <div className="mi-kpi-tile">
                <div className="mi-kpi-label">Top gainers</div>
                <div className="mi-kpi-value">—</div>
              </div>
              <div className="mi-kpi-tile">
                <div className="mi-kpi-label">Top losers</div>
                <div className="mi-kpi-value">—</div>
              </div>
            </div>

            <div className="mi-divider" style={{ marginTop: 12, marginBottom: 12 }} />

            <div className="mi-row" style={{ flexWrap: "wrap" }}>
              <Link className="mi-btn mi-btn-primary" href="/watchlists">
                Go to watchlists
              </Link>
              <Link className="mi-btn" href="/quotes/AAPL">
                Open sample quote
              </Link>
              <Link className="mi-btn" href="/alerts">
                Manage alerts
              </Link>
              <Link className="mi-btn" href="/preferences">
                Preferences
              </Link>
            </div>
          </section>

          <section className="mi-card" aria-label="Quick tips">
            <div className="mi-title">What you can do</div>
            <p className="mi-subtitle">
              Track tickers in watchlists, view quote details with indicators, read per-ticker news, set alerts, and
              monitor portfolio P/L.
            </p>
            <div className="mi-divider" style={{ marginTop: 12, marginBottom: 12 }} />
            <ul className="mi-help" style={{ paddingLeft: 18, display: "grid", gap: 6 }}>
              <li>Use Watchlists to organize tickers you care about.</li>
              <li>Open a Quote to view the chart + indicators (SMA/EMA/RSI/MACD UI placeholder).</li>
              <li>Create Alerts for price/percent/indicator thresholds (UI placeholder).</li>
              <li>Track holdings and performance under Portfolio (UI placeholder).</li>
            </ul>
          </section>
        </>
      )}
    </AppShell>
  );
}
