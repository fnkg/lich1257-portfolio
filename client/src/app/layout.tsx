import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { freepixel } from "@/fonts";
import { Header } from "@/components/layout/header";
import ClientThreeScene from "@/components/layout/client-three-scene";
import { getGlobalSettings } from "@/data/loaders";
import "@/styles/globals.css";

async function loader() {
  const data = await getGlobalSettings();
  if (!data) notFound();
  return { ...data.data };
}

export const metadata: Metadata = {
  title: {
    template: "lich 1257 / %s",
    default: "lich 1257",
  },
  description: "multimedia artist",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await loader();
  return (
    <html lang="en">
      <body className={freepixel.className}>
        <Header data={data.header} />
        <ClientThreeScene />
        {children}
      </body>
    </html>
  );
}
