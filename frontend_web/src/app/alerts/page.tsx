"use client";

import React from "react";
import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/States";

type Alert = {
  id: string;
  symbol: string;
  type: "price" | "percent" | "indicator";
  condition: string;
  active: boolean;
};

export default function AlertsPage() {
  const [alerts, setAlerts] = React.useState<Alert[]>([]);

  return (
    <AppShell title="Alerts" subtitle="Price, percent, and indicator-based alerts.">
      {alerts.length === 0 ? (
        <EmptyState
          title="No alerts"
          message="Create alerts to get notified when conditions are met."
          action={
            <button
              className="mi-btn mi-btn-primary"
              onClick={() =>
                setAlerts([
                  { id: "a1", symbol: "AAPL", type: "price", condition: ">= 200", active: true },
                ])
              }
            >
              Create sample alert
            </button>
          }
        />
      ) : (
        <section className="mi-card" aria-label="Alerts list">
          <div className="mi-card-header">
            <div>
              <div className="mi-title">Your alerts</div>
              <p className="mi-subtitle">Manage active notifications (UI placeholder).</p>
            </div>
            <button className="mi-btn mi-btn-primary" onClick={() => alert("Create alert (placeholder).")}>
              New alert
            </button>
          </div>

          <div className="mi-list">
            {alerts.map((a) => (
              <div key={a.id} className="mi-list-item">
                <div>
                  <div style={{ fontWeight: 650 }}>
                    <span className="mi-mono">{a.symbol}</span> • {a.type.toUpperCase()}
                  </div>
                  <div className="mi-help">Condition: {a.condition}</div>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
                  <span className={a.active ? "mi-badge-success" : "mi-badge-muted"} style={{ padding: "2px 10px", borderRadius: 999 }}>
                    {a.active ? "Active" : "Paused"}
                  </span>
                  <button
                    className="mi-btn"
                    onClick={() => setAlerts((prev) => prev.map((x) => (x.id === a.id ? { ...x, active: !x.active } : x)))}
                  >
                    Toggle
                  </button>
                  <button
                    className="mi-btn mi-btn-danger"
                    onClick={() => setAlerts((prev) => prev.filter((x) => x.id !== a.id))}
                  >
                    Delete
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
