"use client";

import React from "react";
import { AppShell } from "@/components/AppShell";

export default function PreferencesPage() {
  const [defaultInterval, setDefaultInterval] = React.useState("1D");
  const [chartType, setChartType] = React.useState<"candlestick" | "line">("candlestick");
  const [currency, setCurrency] = React.useState("USD");

  return (
    <AppShell title="Preferences" subtitle="Customize defaults for charts, alerts, and display.">
      <section className="mi-card" aria-label="Preferences form">
        <div className="mi-title">Defaults</div>
        <p className="mi-subtitle">This page is UI-complete; wiring to backend preferences endpoint will follow.</p>

        <div className="mi-divider" style={{ marginTop: 12, marginBottom: 12 }} />

        <form
          className="mi-stack"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Preferences saved (placeholder).");
          }}
        >
          <label className="mi-stack" style={{ gap: 6 }}>
            <span className="mi-help">Default chart interval</span>
            <select className="mi-input" value={defaultInterval} onChange={(e) => setDefaultInterval(e.target.value)}>
              <option value="1D">1D</option>
              <option value="1W">1W</option>
              <option value="1M">1M</option>
              <option value="6M">6M</option>
              <option value="1Y">1Y</option>
            </select>
          </label>

          <label className="mi-stack" style={{ gap: 6 }}>
            <span className="mi-help">Chart type</span>
            <select
              className="mi-input"
              value={chartType}
              onChange={(e) => setChartType(e.target.value as "candlestick" | "line")}
            >
              <option value="candlestick">Candlestick</option>
              <option value="line">Line</option>
            </select>
          </label>

          <label className="mi-stack" style={{ gap: 6 }}>
            <span className="mi-help">Display currency</span>
            <input className="mi-input" value={currency} onChange={(e) => setCurrency(e.target.value)} />
          </label>

          <div className="mi-row" style={{ flexWrap: "wrap" }}>
            <button className="mi-btn mi-btn-primary" type="submit">
              Save preferences
            </button>
            <button className="mi-btn" type="button" onClick={() => alert("Reset (placeholder).")}>
              Reset
            </button>
          </div>

          <p className="mi-help">
            Indicators available on quote pages: SMA/EMA/RSI/MACD (UI toggles in place; chart integration pending).
          </p>
        </form>
      </section>
    </AppShell>
  );
}
