import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";


const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tchamna Shck - AI Engineer & Data Scientist",
  description: "Tchamna Shck - Data Scientist & AI Engineer portfolio",
  icons: {
    icon: '/icon_tatascience_tchamna.png',
    apple: '/icon_tatascience_tchamna.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {`try{const t=localStorage.getItem('theme');document.documentElement.classList.toggle('dark',t==='dark');}catch(e){}`}
        </Script>
        {children}
      </body>
    </html>
  );
}
