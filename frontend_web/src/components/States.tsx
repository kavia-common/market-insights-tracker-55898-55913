import React from "react";

export function LoadingState({ title, subtitle }: { title?: string; subtitle?: string }) {
  return (
    <div className="mi-card mi-loading" role="status" aria-live="polite">
      <div className="mi-title">{title ?? "Loading…"}</div>
      {subtitle ? <p className="mi-subtitle">{subtitle}</p> : null}
      <div className="mi-divider" style={{ marginTop: 12, marginBottom: 12 }} />
      <div className="mi-state">Fetching data…</div>
    </div>
  );
}

export function ErrorState({
  title,
  message,
  action,
}: {
  title?: string;
  message: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mi-card" role="alert" aria-live="assertive">
      <div className="mi-title">{title ?? "Something went wrong"}</div>
      <p className="mi-subtitle">{message}</p>
      <div className="mi-divider" style={{ marginTop: 12, marginBottom: 12 }} />
      <div className="mi-state mi-error">{message}</div>
      {action ? <div style={{ marginTop: 12 }}>{action}</div> : null}
    </div>
  );
}

export function EmptyState({
  title,
  message,
  action,
}: {
  title: string;
  message: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mi-card">
      <div className="mi-title">{title}</div>
      <p className="mi-subtitle">{message}</p>
      {action ? <div style={{ marginTop: 12 }}>{action}</div> : null}
      <div className="mi-divider" style={{ marginTop: 12 }} />
      <div className="mi-state">No items yet.</div>
    </div>
  );
}
