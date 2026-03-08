import type { Metadata } from "next";
import "./globals.css";
import { lato } from "./font";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Unicrescent | Best E-commerce platform in BD",
  description: "Best E-commerce platform in BD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.className} antialiased`}>
        <NextTopLoader showSpinner={false} color="#1C4093" />
        {children}
      </body>
    </html>
  );
}
