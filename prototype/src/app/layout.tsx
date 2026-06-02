import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Renovation Estimator",
  description: "Get a realistic renovation budget based on room size, finish quality, and regional Polish pricing.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-bg">{children}</body>
    </html>
  );
}
