import "./globals.css";
import type { Metadata } from "next";
import { Signika } from "next/font/google";
import { Sidebar } from "@/components/ui/Sidebar";
import { BottomNav } from "@/components/ui/BottomNav";

const signika = Signika({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JSONPlaceholder Dash",
  description: "A premium dashboard for JSONPlaceholder APIs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${signika.className} bg-background min-h-screen antialiased`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 lg:ml-64 min-h-screen animate-in fade-in duration-700 bg-linear-to-b from-background to-secondary/30">
            <div className="max-w-screen-2xl mx-auto px-3 py-4 sm:px-5 sm:py-6 md:px-6 lg:px-8 lg:py-8 pb-24 lg:pb-8">
              {children}
            </div>
          </main>
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
