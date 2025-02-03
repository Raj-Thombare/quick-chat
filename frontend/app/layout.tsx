import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "@/providers/SessionProvider";
import { Toaster } from "@/components/ui/sonner";
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: "ChatGroups",
  description: "To make chatting quick as possible without any login.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <SessionProvider>
        <body className={`${GeistSans.className} antialiased`}>
          {children}
          <Toaster richColors duration={10000} />
        </body>
      </SessionProvider>
    </html>
  );
}
