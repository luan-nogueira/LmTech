import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LM Tech — Soluções Digitais | Desenvolvimento Web e Sistemas",
  description:
    "Desenvolvimento de sites profissionais, sistemas web sob medida, dashboards executivos e automações de alta performance. Transformamos ideias em ecossistemas digitais que escalam o seu negócio.",
  keywords: [
    "LM Tech",
    "desenvolvimento web",
    "sistemas sob medida",
    "dashboards",
    "landing pages",
    "aplicativos web",
    "automação de processos",
    "criação de sites",
    "Luan Nogueira",
  ],
  authors: [{ name: "LM Tech Soluções Digitais" }],
  creator: "LM Tech",
  openGraph: {
    title: "LM Tech — Soluções Digitais de Alta Performance",
    description:
      "Sites modernos, sistemas sob medida e automações de alto impacto para elevar o patamar competitivo da sua empresa.",
    url: "https://site-luan.vercel.app/",
    siteName: "LM Tech",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#07090E",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="min-h-screen bg-[#07090E] text-[#F8FAFC] antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
