import type { Metadata } from "next";
import "./globals.css";

import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

export const metadata: Metadata = {
  title: "Spotify Group Listen",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
