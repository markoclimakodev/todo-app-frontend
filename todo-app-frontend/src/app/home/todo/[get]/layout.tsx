import Transition from "@/app/transition";
import Sidebar from "@/components/Sidebard/Sidebar";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ['300', '400', '500', '700', '900'] });

export const metadata: Metadata = {
    title: "Home",
    description: "Your todo list",
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
                <main className="flex">
                    <Sidebar />
                    <section className="flex flex-col bg-slate-100  w-full h-screen overflow-auto">
                        {children}
                    </section>
                </main>
                </Transition>
            </body>
        </html>
    );
}
