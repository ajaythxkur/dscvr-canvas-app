import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import Bootstrap from "@/context/bootstrap";
import 'bootstrap/dist/css/bootstrap.css'
import "./globals.css";

const font = Josefin_Sans({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "App Title",
  description: "App description",
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
      <body className={font.className}>
        {children}
        <Bootstrap />
      </body>
    </html>
  );
}
