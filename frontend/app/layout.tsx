import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "@/providers/SessionProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Quick Chat",
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
        <body className={`antialiased`}>
          {children}
          <Toaster richColors duration={10000} />
        </body>
      </SessionProvider>
    </html>
  );
}
