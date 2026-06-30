import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hartwell — Construction & Restoration | Vancouver, BC",
  description:
    "Hartwell is a Vancouver-based general contractor specializing in new construction, heritage restoration and design-forward renovations. Building what lasts since 1998.",
  openGraph: {
    title: "Hartwell — Construction & Restoration",
    description:
      "New construction, heritage restoration and design-forward renovations. Building what lasts since 1998.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%231a160f'/%3E%3Cpath d='M9 23V9h3v5.5h8V9h3v14h-3v-5.5h-8V23z' fill='%23e8d9c3'/%3E%3C/svg%3E"
        />
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
