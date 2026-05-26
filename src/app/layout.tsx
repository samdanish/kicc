import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KICC | Premium International Career Consultancy in Kashmir",
  description: "Expert guidance for overseas education, study visas, and scholarships. KICC helps students in Kashmir secure admissions in top international universities.",
  keywords: ["Study abroad consultancy", "Career consultancy Kashmir", "International education consultant", "Study visa guidance", "Scholarships abroad"],
  openGraph: {
    title: "KICC | Premium International Career Consultancy",
    description: "Start your international education journey with KICC. Top universities, scholarships, and visa success.",
    type: "website",
    locale: "en_US",
    siteName: "KICC",
  },
  twitter: {
    card: "summary_large_image",
    title: "KICC | Premium International Career Consultancy",
    description: "Expert guidance for overseas education, study visas, and scholarships.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Local Business & Educational Organization Schema Markup for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Kashmir International Career Consultancy (KICC)",
              "description": "Premium study abroad and career consultancy based in Kashmir.",
              "url": "https://kicc.com", 
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Srinagar",
                "addressRegion": "Jammu and Kashmir",
                "addressCountry": "IN"
              }
            }),
          }}
        />
      </head>
      <body className={`${jakarta.className} min-h-screen flex flex-col`}>
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}