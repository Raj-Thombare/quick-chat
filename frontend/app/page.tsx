"use client";

import Footer from "@/components/base/Footer";
import HeroSection from "@/components/base/HeroSection";
import Navbar from "@/components/base/Navbar";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className='min-h-screen flex flex-col items-center'>
      <Navbar user={session?.user} />

      <main className='flex-1'>
        <HeroSection />
      </main>

      <Footer />
    </div>
  );
}
