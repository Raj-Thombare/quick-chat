"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  return (
    <section className='w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center space-y-4 text-center'>
          <div className='space-y-2'>
            <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
              Connect, Collaborate, Communicate
            </h1>
            <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
              Create or join groups, chat in real-time, and stay connected with
              your team, friends, or community.
            </p>
          </div>
          <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4'>
            <Button size='lg' onClick={() => router.push("/dashboard")}>
              Create a Group
            </Button>
            <Button
              size='lg'
              variant='outline'
              onClick={() => router.push("/dashboard")}>
              Join a Group
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
