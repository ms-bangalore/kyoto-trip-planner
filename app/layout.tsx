import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kyoto Trip Planner",
  description: "Prototype: plan a Kyoto weekend in one chat.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="h-full bg-stone-100 text-stone-900">{children}</body>
    </html>
  );
}
