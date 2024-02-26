import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], weight: ['400', '600'] });

export const metadata: Metadata = {
  title: "Login",
  description: "Welcome to your best Todo List",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={archivo.className}>
          {children}
      </body>
    </html>
  );
}
