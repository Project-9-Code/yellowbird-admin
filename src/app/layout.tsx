import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import '@radix-ui/themes/styles.css';

import type { Metadata } from "next";
import clsx from "clsx";
import { whitney } from "@/utils/fonts";
import AppProviders from "@/components/Providers";
import AppToastContainer from "@/components/ToastContainer";

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
          <AppToastContainer />
        </AppProviders>
      </body>
    </html>
  );
}
