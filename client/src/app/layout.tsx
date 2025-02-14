import type { Metadata } from "next";
import "@/styles/globals.css";
import { freepixel } from "@/fonts";

import { Header } from "@/components/layout/Header";
import { getGlobalSettings } from "@/data/loaders";
import { notFound } from "next/navigation";

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
  const background = data.background;

  console.log(background.url);

  return (
    <html lang="en">
      <body className={freepixel.className}>
        <Header data={data.header} />
        {children}

        <video autoPlay muted loop className="backgroundVideo">
          <source
            src={`http://localhost:1337${background.url}`}
            type="video/mp4"
          />
        </video>
      </body>
    </html>
  );
}
