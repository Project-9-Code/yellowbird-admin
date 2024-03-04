import type { Metadata } from "next";
import "./globals.css";
import clsx from "clsx";
import { whitney } from "@/utils/fonts";

export const metadata: Metadata = {
  title: "Yellowbird Dashboard",
  description: "Yellowbird admin dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clsx("w-full h-full", whitney.variable)}>
      <body className="w-full h-full text-bodyText">
        {children}
      </body>
    </html>
  );
}
