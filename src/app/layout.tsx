import { Footer, Navbar, Providers } from "@/components";
import { Toaster } from "@/components/ui/toaster";
import { constructMetadata } from "@/lib/utils";
import { Recursive } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata = constructMetadata()

interface RootLayoutProps {
  children: ReactNode;

}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body className={recursive.className}>
        <Navbar />

        <main className="flex flex-col min-h-[calc(100vh-3.5rem-1px)] grainy-light dark:grainy-dark">
          <div className="flex-1 flex flex-col h-full">
            <Providers>
              {children}
            </Providers>
          </div>
          <Footer />
        </main>

        <Toaster />
      </body>
    </html>
  );
}
