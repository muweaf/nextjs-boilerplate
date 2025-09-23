// @ts-nocheck
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Murat Musa Dimlit | Kişisel Blog",
  description: "Hakkımda, projeler, galeri ve iletişim.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body
        className={`${inter.variable} font-sans antialiased bg-gradient-to-b from-slate-50 to-white text-slate-800`}
      >
        {children}
      </body>
    </html>
  );
}
