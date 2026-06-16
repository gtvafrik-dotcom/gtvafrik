import type { Metadata } from "next";
import { Prompt, Inter } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-prompt",
});

// Import the clean, highly legible Inter font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "GTVAFRIK | Media",
  description: "Accelerating African Narrative",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Applied the inter font as the default sans-serif font */}
      <body className={`${inter.variable} ${prompt.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

