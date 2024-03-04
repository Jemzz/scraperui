import type { Metadata } from "next";
import Nav from "./nav";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import ParticleBackground from "./particlebackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Infoscraper",
  description: "Scraping the web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ParticleBackground />
        <div className="container">
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}
