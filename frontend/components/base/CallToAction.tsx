import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const CallToAction = () => {
  return (
    <section className='w-full py-12 md:py-24 lg:py-32'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='space-y-2'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
              Join ChatGroups Today
            </h2>
            <p className='max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
              {`Start chatting with your team, friends, or community in minutes. Create or join a group now!`}
            </p>
          </div>
          <div className='w-full max-w-sm space-y-2'>
            <Button className='w-full' size='lg'>
              Get Started
            </Button>
            <p className='text-xs text-gray-500 dark:text-gray-400'>
              {`By signing up, you agree to our`}{" "}
              <Link href='#' className='underline underline-offset-2'>
                Terms & Conditions
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
