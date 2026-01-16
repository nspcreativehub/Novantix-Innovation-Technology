import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
// ChatWidget temporarily disabled - uncomment when ready to use
// import ChatWidget from "@/components/ChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Novantix Innovation Technology - Industry-Ready Skills & Real-World Projects",
  description: "Empowering students with real-world skills, industry-grade projects, and professional certification. Learn, Build, Get Certified, and Get Job-Ready.",
  keywords: "EdTech, IT training, Java, Spring Boot, DSA, Full Stack, Projects, Certification, Job Ready",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        {/* ChatWidget temporarily disabled - uncomment when ready to use */}
        {/* <ChatWidget /> */}
      </body>
    </html>
  );
}
