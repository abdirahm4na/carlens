import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppChrome } from "@/components/navigation/AppChrome";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CarLens",
  description: "AI-powered car identification for enthusiasts and shoppers.",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'%3E%3Cdefs%3E%3ClinearGradient id='c' x1='24' y1='13' x2='70' y2='83'%3E%3Cstop stop-color='%2322D3EE'/%3E%3Cstop offset='.34' stop-color='%232563EB'/%3E%3Cstop offset='.68' stop-color='%23104DE8'/%3E%3Cstop offset='1' stop-color='%237C3AED'/%3E%3C/linearGradient%3E%3CradialGradient id='l' cx='0' cy='0' r='1' gradientTransform='translate(46 44) rotate(64) scale(27)'%3E%3Cstop stop-color='%231E293B'/%3E%3Cstop offset='.45' stop-color='%23030712'/%3E%3Cstop offset='1' stop-color='%23000000'/%3E%3C/radialGradient%3E%3Cmask id='m'%3E%3Crect width='96' height='96' fill='white'/%3E%3Cpath d='M59.5 36.5L78 18H96V78H78L59.5 59.5V36.5Z' fill='black'/%3E%3C/mask%3E%3C/defs%3E%3Crect width='96' height='96' rx='22' fill='%23050505'/%3E%3Cg mask='url(%23m)'%3E%3Ccircle cx='48' cy='48' r='34' stroke='url(%23c)' stroke-width='19' fill='none'/%3E%3C/g%3E%3Ccircle cx='43.5' cy='48' r='24' fill='%2305070A'/%3E%3Ccircle cx='43.5' cy='48' r='21' fill='url(%23l)'/%3E%3Ccircle cx='43.5' cy='48' r='20.2' stroke='%2394A3B8' stroke-opacity='.28' stroke-width='2' fill='none'/%3E%3Ccircle cx='43.5' cy='48' r='13' fill='%23020617'/%3E%3Ccircle cx='36.6' cy='37.2' r='5.7' fill='%238B5CF6'/%3E%3Ccircle cx='44.3' cy='43.6' r='2.8' fill='%2322D3EE'/%3E%3C/svg%3E",
        type: "image/svg+xml",
      },
    ],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
