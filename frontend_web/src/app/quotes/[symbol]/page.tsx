import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { EmptyState } from "@/components/States";
import QuoteDetailClient from "./quote-detail-client";

/**
 * Static-export support (next.config.ts output: "export"):
 * We must predefine the dynamic routes we want to generate at build time.
 */
export const dynamicParams = false;

// PUBLIC_INTERFACE
export function generateStaticParams(): Array<{ symbol: string }> {
  /** Pre-generates a small set of sample ticker pages for static export. */
  return [{ symbol: "AAPL" }, { symbol: "MSFT" }, { symbol: "TSLA" }];
}

export default async function QuoteDetailPage({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = await params;
  const upper = (symbol ?? "").toUpperCase();

  if (!upper) {
    return (
      <AppShell title="Quote: —" subtitle="Chart, indicators, and recent news for the ticker.">
        <EmptyState
          title="No symbol"
          message="Open a quote from a watchlist or use a direct URL like /quotes/AAPL."
          action={
            <Link className="mi-btn mi-btn-primary" href="/watchlists">
              Go to watchlists
            </Link>
          }
        />
      </AppShell>
    );
  }

  return <QuoteDetailClient symbol={upper} />;
}
