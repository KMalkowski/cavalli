import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import Collections from "@/components/layout/search/collections";
import { Suspense } from "react";
import ChildrenWrapper from "./children-wrapper";
import FilterList from "@/components/layout/search/filter";
import { sorting } from "@/lib/constants";
import Footer from "@/components/layout/footer";
import { baseUrl } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Cavalli",
    template: `%s | Cavalli`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ConvexClientProvider>
            <Navbar />
            <div className="mx-auto flex max-w-(--breakpoint-2xl) flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
              <div className="order-first w-full flex-none md:max-w-[125px]">
                <Collections />
              </div>
              <div className="order-last min-h-screen w-full md:order-none">
                <Suspense fallback={null}>
                  <ChildrenWrapper>{children}</ChildrenWrapper>
                </Suspense>
              </div>
              <div className="order-none flex-none md:order-last md:w-[125px]">
                <FilterList list={sorting} title="Sort by" />
              </div>
            </div>
            <Footer />
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
