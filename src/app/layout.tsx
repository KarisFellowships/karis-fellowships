import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://karisfellowships.com"),
  title: {
    default: "Karis Fellowships",
    template: "%s | Karis Fellowships",
  },
  description: "Empowering Christians to fulfill their true glory.",
  openGraph: {
    title: "Karis Fellowships",
    description: "Empowering Christians to fulfill their true glory.",
    url: "https://karisfellowships.com",
    siteName: "Karis Fellowships",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Karis Fellowships",
    description: "Empowering Christians to fulfill their true glory.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${cormorant.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
