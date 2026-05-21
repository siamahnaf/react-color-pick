import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Color Tools by Siam Ahnaf — React Color Pick & Chrome Color Picker",
  description:
    "A canva-style React color picker component for the web and a powerful Chrome extension to pick, store, and explore colors from any page.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Color Tools by Siam Ahnaf",
    description:
      "React Color Pick npm package and the Color Picker Chrome extension — by Siam Ahnaf.",
    images: ["/logo.png"],
  },
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body className={`${geistSans.className} antialiased`}>{children}</body>
    </html>
  );
};

export default RootLayout;
