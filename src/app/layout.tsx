import type { Metadata } from "next";
import { Pixelify_Sans } from "next/font/google";
import Bootstrap from "@/context/bootstrap";
import 'bootstrap/dist/css/bootstrap.css'
import "./globals.css";

const roboto = Pixelify_Sans({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "Dscvr Talent",
  description: "Dscvr talent showcase app",
  other: {
    "dscvr:canvas:version":"vNext",
    "og:image": "/next.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {children}
        <Bootstrap />
      </body>
    </html>
  );
}
