import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/ui/Index";
import DashHeader from "@/components/ui/dashboard/header";

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
    <div className="">
      <DashHeader />

      {children}
    </div>
  );
}
