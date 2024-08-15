import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/index";
const poppins = Poppins({weight: ["200", "400", "600", "700"] ,subsets: ["latin", "latin-ext"]});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
