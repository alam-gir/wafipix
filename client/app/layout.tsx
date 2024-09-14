import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import TopLoader from "nextjs-toploader";
import Footer from "@/components/global/footer";
import ReactQueryProvider from "@/components/providers/react-query-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Navbar from "@/components/global/nav/navbar";
import ClientSessionProvider from "@/components/hooks/client-session-provider";

const inter = Inter({
  subsets: ["latin"],
  fallback: ["sans-serif"],
});

export const metadata: Metadata = {
  title: "Wafipix | A Design Agency",
  description:
    "Wafipix is a design agency that provides services in web design, graphic design, and branding. And  we bring your ideas to life. And many more...",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${inter.className} h-fit bg-background2`}>
        <SessionProvider session={session}>
          <ReactQueryProvider>
            <ClientSessionProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <TopLoader height={5} color="#5025D0" />
                
                <Navbar />

                {children}

                {/* footer */}
                <Footer />

                {/* Toaster */}
                <Toaster />
              </ThemeProvider>
            </ClientSessionProvider>
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
