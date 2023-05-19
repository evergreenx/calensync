import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Index";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Calensync",
  description: "fix unnecessary discusion ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="max-w-7xl mx-auto p-10">{children}</div>
      </body>
    </html>
  );
}
