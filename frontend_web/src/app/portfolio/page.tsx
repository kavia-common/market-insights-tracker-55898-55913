"use client";

import React from "react";
import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/States";
import Link from "next/link";

type Holding = {
  id: string;
  symbol: string;
  shares: number;
  avgCost: number;
  last: number;
};

function formatUsd(v: number): string {
  return v.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

export default function PortfolioPage() {
  const [holdings, setHoldings] = React.useState<Holding[]>([
    { id: "h1", symbol: "AAPL", shares: 10, avgCost: 170, last: 190 },
    { id: "h2", symbol: "MSFT", shares: 3, avgCost: 320, last: 410 },
  ]);

  const totalMarketValue = holdings.reduce((sum, h) => sum + h.shares * h.last, 0);
  const totalCost = holdings.reduce((sum, h) => sum + h.shares * h.avgCost, 0);
  const totalPL = totalMarketValue - totalCost;

  return (
    <AppShell title="Portfolio" subtitle="Holdings, market value, and P/L (UI placeholder).">
      {holdings.length === 0 ? (
        <EmptyState
          title="No holdings"
          message="Add a holding to begin tracking performance."
          action={
            <button
              className="mi-btn mi-btn-primary"
              onClick={() => setHoldings([{ id: "h1", symbol: "AAPL", shares: 1, avgCost: 150, last: 190 }])}
            >
              Add sample holding
            </button>
          }
        />
      ) : (
        <>
          <section className="mi-card" aria-label="Portfolio KPIs">
            <div className="mi-card-header">
              <div>
                <div className="mi-title">Summary</div>
                <p className="mi-subtitle">Totals computed client-side for now.</p>
              </div>
              <button className="mi-btn mi-btn-primary" onClick={() => alert("Add holding (placeholder).")}>
                Add holding
              </button>
            </div>

            <div className="mi-kpi">
              <div className="mi-kpi-tile">
                <div className="mi-kpi-label">Market value</div>
                <div className="mi-kpi-value">{formatUsd(totalMarketValue)}</div>
              </div>
              <div className="mi-kpi-tile">
                <div className="mi-kpi-label">Cost basis</div>
                <div className="mi-kpi-value">{formatUsd(totalCost)}</div>
              </div>
              <div className="mi-kpi-tile">
                <div className="mi-kpi-label">Unrealized P/L</div>
                <div className="mi-kpi-value" style={{ color: totalPL >= 0 ? "var(--mi-success)" : "var(--mi-error)" }}>
                  {formatUsd(totalPL)}
                </div>
              </div>
            </div>
          </section>

          <section className="mi-card" aria-label="Holdings list">
            <div className="mi-title">Holdings</div>
            <p className="mi-subtitle">Tap a symbol to open quote details.</p>

            <div className="mi-divider" style={{ marginTop: 12, marginBottom: 12 }} />

            <div className="mi-list">
              {holdings.map((h) => {
                const mv = h.shares * h.last;
                const cost = h.shares * h.avgCost;
                const pl = mv - cost;
                return (
                  <div key={h.id} className="mi-list-item">
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 700 }}>
                        <Link href={`/quotes/${h.symbol}`} className="mi-mono">
                          {h.symbol}
                        </Link>{" "}
                        <span className="mi-help">• {h.shares} shares</span>
                      </div>
                      <div className="mi-help">
                        Avg {formatUsd(h.avgCost)} • Last {formatUsd(h.last)}
                      </div>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontWeight: 700 }}>{formatUsd(mv)}</div>
                      <div className="mi-help" style={{ color: pl >= 0 ? "var(--mi-success)" : "var(--mi-error)" }}>
                        {formatUsd(pl)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}
    </AppShell>
  );
}
