"use client";

// import FeatureSection from "@/components/base/FeatureSection";
// import Footer from "@/components/base/Footer";
import HeroSection from "@/components/base/HeroSection";
import Navbar from "@/components/base/Navbar";
// import UserReviews from "@/components/base/UserReviews";
// import HowItWorks from "@/components/base/HowItWorks";
// import Insights from "@/components/base/Insights";
// import CallToAction from "@/components/base/CallToAction";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className='min-h-screen flex flex-col items-center'>
      <Navbar user={session?.user} />

      <main className='flex-1'>
        <HeroSection />

         {/* <FeatureSection />

        <HowItWorks /> */}

        {/*<UserReviews />

        <Insights />

        <CallToAction /> */}
      </main>

      {/* <Footer /> */}
    </div>
  );
}
