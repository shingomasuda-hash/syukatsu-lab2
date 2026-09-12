import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.description}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-js はペイント前のスクリプトが付けるため、hydration 差分を許容する
    <html lang="ja" suppressHydrationWarning>
      <head>
        {/* ペイント前に立てる。これが無い環境では reveal 対象が最初から見えている。 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute("data-js","on")`,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
