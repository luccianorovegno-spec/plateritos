import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Plateritos | Libreria premium accesible",
  description:
    "Plateritos: papeleria y libros con diseno creativo, colecciones escolares y de oficina.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
