import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kicc.co.in"),
  title: {
    default: "KICC | Premium International Career Consultancy in Kashmir",
    template: "%s | KICC", 
  },
  description: "Expert guidance for overseas education, study visas, and scholarships. KICC helps students in Kashmir secure admissions in top international universities.",
  keywords: ["Study abroad consultancy", "Career consultancy Kashmir", "International education consultant", "Study visa guidance", "Scholarships abroad", "KICC Srinagar"],
  alternates: {
    canonical: "/",
  },
  // ADD THIS FOR GOOGLE SEARCH CONSOLE VERIFICATION
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE", // Get this from Google Search Console (HTML Tag method)
  },
  openGraph: {
    title: "KICC | Premium International Career Consultancy",
    description: "Start your international education journey with KICC. Top universities, scholarships, and visa success.",
    url: "https://kicc.co.in",
    siteName: "KICC",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KICC | Premium International Career Consultancy",
    description: "Expert guidance for overseas education, study visas, and scholarships.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Kashmir International Career Consultancy (KICC)",
              "description": "Premium study abroad and career consultancy based in Kashmir.",
              "url": "https://kicc.co.in", 
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
        
        {/* ADD GOOGLE ANALYTICS HERE */}
        <GoogleAnalytics gaId="G-YOUR_MEASUREMENT_ID" /> 
      </body>
    </html>
  );
}