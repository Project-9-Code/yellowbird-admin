import type { Metadata } from "next";
import "./globals.css";
import clsx from "clsx";
import { whitney } from "@/utils/fonts";
import { getUser } from "@/utils/auth/server";
import AppProviders from "@/components/Providers";
import AppHeader from "@/components/Header";

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
    <html lang="en" className={clsx("w-full h-full", whitney.variable)}>
      <body className="w-full h-full text-bodyText flex flex-col">
        <AppProviders>
          <main className="flex flex-col grow bg-snowGrey">
            <AppHeader />
            {children}
          </main>
        </AppProviders>
      </body>
    </html>
  );
}
