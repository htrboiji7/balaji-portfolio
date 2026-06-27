import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://balaji.dev"),
  title: {
    default: "Balaji | AI Engineer & Full Stack Developer",
    template: "%s | Balaji",
  },
  description:
    "Building AI systems, modern software, backend architectures, automations and scalable digital experiences.",
  keywords: [
    "AI Engineer",
    "Full Stack Developer",
    "Backend Developer",
    "Next.js",
    "TypeScript",
    "Automation",
    "Portfolio",
  ],
  authors: [{ name: "Balaji" }],
  creator: "Balaji",
  publisher: "Balaji",
  applicationName: "Balaji Portfolio",
  themeColor: "#050505",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
