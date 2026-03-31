"use client";

import React from "react";
import { AppShell } from "@/components/AppShell";

export default function SignInPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <AppShell title="Sign in" subtitle="Access your watchlists, alerts, and portfolio.">
      <section className="mi-card" aria-label="Sign in form">
        <div className="mi-title">Welcome back</div>
        <p className="mi-subtitle">This UI is ready; backend auth endpoints will be wired when available.</p>

        <div className="mi-divider" style={{ marginTop: 12, marginBottom: 12 }} />

        <form
          className="mi-stack"
          onSubmit={(e) => {
            e.preventDefault();
            // Placeholder: wire to backend auth when endpoints exist.
            alert("Sign-in flow not yet connected to backend.");
          }}
        >
          <label className="mi-stack" style={{ gap: 6 }}>
            <span className="mi-help">Email</span>
            <input
              className="mi-input"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="mi-stack" style={{ gap: 6 }}>
            <span className="mi-help">Password</span>
            <input
              className="mi-input"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <div className="mi-row" style={{ flexWrap: "wrap" }}>
            <button className="mi-btn mi-btn-primary" type="submit">
              Sign in
            </button>
            <a className="mi-btn" href="/auth/sign-up">
              Create account
            </a>
          </div>

          <p className="mi-help">
            Tip: set <span className="mi-mono">NEXT_PUBLIC_API_BASE_URL</span> to point at the FastAPI backend.
          </p>
        </form>
      </section>
    </AppShell>
  );
}
