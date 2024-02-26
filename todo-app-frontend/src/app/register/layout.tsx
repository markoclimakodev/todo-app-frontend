import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Transition from "../transition";

const roboto = Roboto({ subsets: ["latin"], weight: ['300', '400', '500', '700', '900'] });

export const metadata: Metadata = {
  title: "Register",
  description: "Create your account in the best Todo website!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Transition>
        {children}
        </Transition>
        </body>
    </html>
  );
}
