"use client";

import React from "react";
import { AppShell } from "@/components/AppShell";

export default function SignUpPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");

  return (
    <AppShell title="Create account" subtitle="Set up your profile and preferences.">
      <section className="mi-card" aria-label="Sign up form">
        <div className="mi-title">Get started</div>
        <p className="mi-subtitle">This UI is ready; backend sign-up will be wired when endpoints exist.</p>

        <div className="mi-divider" style={{ marginTop: 12, marginBottom: 12 }} />

        <form
          className="mi-stack"
          onSubmit={(e) => {
            e.preventDefault();
            if (password !== confirm) {
              alert("Passwords do not match.");
              return;
            }
            // Placeholder: wire to backend auth when endpoints exist.
            alert("Sign-up flow not yet connected to backend.");
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
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <label className="mi-stack" style={{ gap: 6 }}>
            <span className="mi-help">Confirm password</span>
            <input
              className="mi-input"
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </label>

          <div className="mi-row" style={{ flexWrap: "wrap" }}>
            <button className="mi-btn mi-btn-primary" type="submit">
              Create account
            </button>
            <a className="mi-btn" href="/auth/sign-in">
              Back to sign in
            </a>
          </div>
        </form>
      </section>
    </AppShell>
  );
}
