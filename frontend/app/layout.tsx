import type { Metadata } from "next";
import "./globals.css";

// Import or define the font variables
import { Inter, Montserrat } from "next/font/google";

const geistSans = Inter({ subsets: ["latin"] });
const geistMono = Montserrat({ subsets: ["latin"] });
import { QueryProvider } from "@/components/providers/query-providers";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/components/providers/language-provider";

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
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.className} ${geistMono.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <QueryProvider>{children}</QueryProvider>
          </LanguageProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
