import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Market Insights Tracker",
  description:
    "Track watchlists, quotes, charts with indicators, news, alerts, portfolio performance, and preferences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
