import FeatureSection from "@/components/base/FeatureSection";
import Footer from "@/components/base/Footer";
import HeroSection from "@/components/base/HeroSection";
import Navbar from "@/components/base/Navbar";
import UserReviews from "@/components/base/UserReviews";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "./api/auth/[...nextauth]/options";
import HowItWorks from "@/components/base/HowItWorks";
import Insights from "@/components/base/Insights";
import CallToAction from "@/components/base/CallToAction";

export default async function Home() {
  const session: CustomSession | null = await getServerSession(authOptions);

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar user={session?.user} />

      <main className='flex-1'>
        <HeroSection />

        <FeatureSection />

        <HowItWorks />

        <UserReviews />

        <Insights />

        <CallToAction />
      </main>

      <Footer />
    </div>
  );
}
