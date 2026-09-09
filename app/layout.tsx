import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import { Fraunces, DM_Sans } from "next/font/google";
import { Footer } from "@/components/footer";
import Script from "next/script";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Localli",
  description: "Guía semanal de contenido para tu negocio local",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider localization={esES}>
      <html
        lang="es"
        className={`${fraunces.variable} ${dmSans.variable} h-full antialiased`}
        suppressHydrationWarning
      >
        <body className="min-h-full flex flex-col">
          {/* Runs before hydration so the stored theme applies with no flash
              of the wrong palette. suppressHydrationWarning on <html> above
              is required since this mutates an attribute React didn't set.
              A plain <script> JSX tag isn't guaranteed to execute on every
              render path — next/script's beforeInteractive strategy is the
              documented way to inject a blocking pre-hydration script. */}
          <Script id="theme-init" strategy="beforeInteractive">
            {`(function(){try{if(localStorage.getItem('theme')==='dark'){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`}
          </Script>
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
