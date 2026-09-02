import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme/ThemeProvider";
import SmoothScroll from "@/components/smooth-scroll/SmoothScroll";
import PageTransition from "@/components/transition/PageTransition";
// import CustomCursor from "@/components/cursor/CustomCursor";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZYAN DEV — Software Engineer",
  description: "Personal portfolio of Zyan Dev.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          <SmoothScroll>
            <PageTransition />

            {/*<CustomCursor />*/}

            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
