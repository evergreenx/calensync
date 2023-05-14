import { Head } from "next/document";

export const metadata = {
  title: "Wribble - The best way to share your ideas",
  description: "Wribble is the best way to share your ideas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className=" flex flex-col h-screen w-full ">
      {children}
    </section>
  );
}
