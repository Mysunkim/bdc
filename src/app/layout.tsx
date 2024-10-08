import localFont from "next/font/local";
import Link from "next/link"
import ClientUserName from '@/app/component/ClientUserName'; 
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
          <ClientUserName/>
        </div>
        {children}
      </body>
    </html>
  );
}
