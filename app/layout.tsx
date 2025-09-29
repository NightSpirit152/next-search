// Общий layout для всех страниц (app router)
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Поиск | Next.js",
  description: "Тестовое: страница поиска с защитой от гонок",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
