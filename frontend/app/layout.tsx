import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-providers";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Smart Building",
  description: "EIU 15th Anniversary Innovation Project",
  icons: {
    icon: "/icon/iic-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
