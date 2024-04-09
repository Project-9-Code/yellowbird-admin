import type { Metadata } from "next";
import "./globals.css";
import clsx from "clsx";
import { whitney } from "@/utils/fonts";
import { getUser } from "@/utils/auth/server";
import AppProviders from "@/components/Providers";
import { ToastContainer } from 'react-toastify';
import "@szhsin/react-menu/dist/index.css";
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: "Yellowbird Dashboard",
  description: "Yellowbird admin dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clsx("w-full h-full", whitney.variable)} data-color-mode="light">
      <body className="w-full h-full text-bodyText flex flex-col">
        <AppProviders>
          <main className="flex flex-col grow bg-snowGrey overflow-hidden">
            {children}
          </main>
          <ToastContainer />
        </AppProviders>
      </body>
    </html>
  );
}
