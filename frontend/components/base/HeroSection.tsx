"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { RainbowButton } from "../ui/rainbow-button";
import { bricolage_grotesque, inter } from "@/lib/font";
import { ChevronRight } from "lucide-react";
import MarqueeComponent from "./MarqueeComponent";

export default function HeroSection() {
  const router = useRouter();

  return (
    <>
      <section className='h-[42vh] md:h-[60vh] flex-grow flex flex-col justify-center items-center dark:from-gray-900 dark:to-gray-800'>
        <div className=' text-center'>
          <h1
            className={`mt-5 text-3xl font-bold md:text-7xl max-w-[900px] leading-6 ${bricolage_grotesque}`}>
            Connect, Collaborate & Communicate
          </h1>
          <p
            className={`mx-auto mt-5 max-w-[340px] md:max-w-[480px] leading-6 text-gray-500 md:text-lg tracking-normal dark:text-gray-400 ${inter}`}>
            Create or join groups and stay connected with your team, friends, or
            community.
          </p>
        </div>
        <div className='flex flex-col mt-8 sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4'>
          <RainbowButton
            className={`${bricolage_grotesque}`}
            size='lg'
            onClick={() => router.push("/dashboard")}>
            <span className='text-base'>Create a Group</span>
          </RainbowButton>
          <RainbowButton
            className={`${bricolage_grotesque}`}
            size='lg'
            onClick={() => router.push("/dashboard")}>
            <span className='text-base'>Join a Room</span>
            <span>
              <ChevronRight />
            </span>
          </RainbowButton>
        </div>
      </section>
      <div className='mt-8'>
        <MarqueeComponent />
      </div>
    </>
  );
}
