// @ts-nocheck
// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "Murat Musa Dimlit | Kişisel Blog",
  description: "Hakkımda, projeler ve iletişim.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
