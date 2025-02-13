import type { Metadata } from "next";
import "@/styles/globals.css";
import { freepixel } from "@/ui/fonts";

export const metadata: Metadata = {
  title: {
    template: "lich 1257 / %s",
    default: "lich 1257",
  },
  description: "multimedia artist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={freepixel.className}>
        {children}

        <video autoPlay muted loop className="backgroundVideo">
          <source src="/assets/background.mp4" type="video/mp4" />
        </video>
      </body>
    </html>
  );
}
