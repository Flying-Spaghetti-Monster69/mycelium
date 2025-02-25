import type { Metadata } from "next";
import { Oranienbaum } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "./providers";

const oranienbaum = Oranienbaum({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mycelium",
  description: "Clothing store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body className={`${oranienbaum.className} antialiased bg-[#f5f5dc]`}>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
