import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { freepixel } from "@/fonts";
import { Header } from "@/components/layout/Header";
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
  const background = data.background;

  return (
    <html lang="en">
      <body className={freepixel.className}>
        <Header data={data.header} />
        {children}

        {background ? (
          <video autoPlay muted loop className="backgroundVideo">
            <source
              src={`http://localhost:1337${background.url}`}
              type="video/mp4"
            />
          </video>
        ) : (
          <></>
        )}
      </body>
    </html>
  );
}
