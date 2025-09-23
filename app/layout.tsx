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
        {/* Dekoratif renkli arka plan (JSX, ekstra CSS yok) */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-fuchsia-400/25 blur-3xl" />
          <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-indigo-400/25 blur-3xl" />
        </div>
        {children}
      </body>
    </html>
  );
}
