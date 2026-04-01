import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Roboto_Flex } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

const roboto = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
});

export const metadata: Metadata = {
  title: "Michelle Guan | Portfolio",
  description: "Product Designer & Visual Explorer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${roboto.variable}`}>
      <body className={`${inter.className} bg-black antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
