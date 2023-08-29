import { Button } from "@/components/ui/button";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Heading from "@/components/Heading";
import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import LogoutButton from "@/components/LogoutButton";
import LoginButton from "@/components/LoginButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scriba",
  description: "Your online journal",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body className={`${inter.className} relative p-8`}>
        <header className="flex justify-between py-6">
          <Link href={`/`}>
            <Heading>Scriba</Heading>
          </Link>
          <div className="flex gap-4">
            {session === null ? <LoginButton /> : <LogoutButton />}
          </div>
        </header>
        {children}
        <footer className="fixed bottom-0 left-0 right-0 p-8 text-center">
          <p className="text-sm">Made with 🥵 by Alessandro Capra</p>
        </footer>
      </body>
    </html>
  );
}
