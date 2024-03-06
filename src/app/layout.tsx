import type { Metadata } from "next";
import "./globals.css";
import clsx from "clsx";
import { whitney } from "@/utils/fonts";
import { getUser } from "@/utils/auth/server";
import AppProviders from "@/components/Providers";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (process.env.NODE_ENV === "development") {
  // Adds Apollo messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

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
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
