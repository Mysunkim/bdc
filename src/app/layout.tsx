import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link"
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="navbar">
          <Link href="/" className="nav-button home">ホーム</Link>
          <Link href="/clubEvent" className="nav-button club-event">サークルイベント</Link>
          <Link href="/gallery" className="nav-button gallery">活動内容</Link>
          <Link href="/aboutUs" className="nav-button about-us">私たちについて</Link>
          <Link href="/userLogin" className="nav-button user-login">ユーザー</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
