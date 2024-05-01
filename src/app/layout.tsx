import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import RecoilContextProvider from "../lib/recoilContext";

const archivo = Archivo({ subsets: ["latin"], weight: ['400', '600'] });

export const metadata: Metadata = {
  title: "Todo App",
  description: "Welcome to your best Todo List",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={archivo.className}>
        <RecoilContextProvider>
          {children}
        </RecoilContextProvider>
      </body>
    </html>
  );
}
