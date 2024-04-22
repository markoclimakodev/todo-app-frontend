'use client'

import Transition from "@/app/transition";
import Sidebar from "@/components/Sidebard/Sidebar";
import { themeState } from "@/store/atoms/themeState";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { useRecoilState } from "recoil";

const roboto = Roboto({ subsets: ["latin"], weight: ['300', '400', '500', '700', '900'] });

const metadata: Metadata = {
    title: "Home",
    description: "Your todo list",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    const [theme, _] = useRecoilState(themeState)

    return (
        <html lang="en">
            <body className={roboto.className}>
                <Transition>
                <main className={`flex transition-all duration-1000 ${theme.theme === "dark" ? "bg-dark" : "bg-light"}`}>
                    <Sidebar />
                    <section className={`flex flex-col w-full h-screen overflow-auto p-3`}>
                        {children}
                    </section>
                </main>
                </Transition>
            </body>
        </html>
    );
}
