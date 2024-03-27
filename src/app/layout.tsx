import type { Metadata } from "next";
import "./globals.css";
import clsx from "clsx";
import { whitney } from "@/utils/fonts";
import { getUser } from "@/utils/auth/server";
import AppProviders from "@/components/Providers";
import { Suspense } from "react";
import "@szhsin/react-menu/dist/index.css";

export const metadata: Metadata = {
  title: "Yellowbird Dashboard",
  description: "Yellowbird admin dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <html lang="en" className={clsx("w-full h-full", whitney.variable)} data-color-mode="light">
      <body className="w-full h-full text-bodyText flex flex-col">
        <AppProviders>
          <main className="flex flex-col grow bg-snowGrey overflow-hidden">
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading...</div>}>
              {children}
            </Suspense>
          </main>
        </AppProviders>
      </body>
    </html>
  );
}
