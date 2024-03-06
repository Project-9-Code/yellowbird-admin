import type { Metadata } from "next";
import "./globals.css";
import clsx from "clsx";
import { whitney } from "@/utils/fonts";
import { AuthProvider } from "@/components/AuthProvider";
import { getUser } from "@/utils/auth/server";

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
      <body className="w-full h-full text-bodyText">
        <AuthProvider serverUser={user}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
