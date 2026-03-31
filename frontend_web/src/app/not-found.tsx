import Link from "next/link";
import React from "react";
import { AppShell } from "@/components/AppShell";

export default function NotFound() {
  return (
    <AppShell title="Not found" subtitle="The page you’re looking for doesn’t exist.">
      <section className="mi-card" role="alert" aria-live="assertive">
        <div className="mi-title">404 – Page Not Found</div>
        <p className="mi-subtitle">Check the URL or return to the overview.</p>
        <div className="mi-divider" style={{ marginTop: 12, marginBottom: 12 }} />
        <Link className="mi-btn mi-btn-primary" href="/">
          Back to overview
        </Link>
      </section>
    </AppShell>
  );
}
