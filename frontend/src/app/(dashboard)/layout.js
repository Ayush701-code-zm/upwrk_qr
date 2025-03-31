import React from "react";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  return (
    <div className="h-screen flex">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4 border-r border-gray-200 dark:border-gray-900 h-full">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src="/logo.png" alt="logo" width={100} height={100} />
          <span className="hidden lg:block font-bold">Artofqr</span>
        </Link>
        <Menu />
      </div>
      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] dark:bg-background overflow-scroll flex flex-col">
        <Navbar />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </div>
    </div>
  );
}
