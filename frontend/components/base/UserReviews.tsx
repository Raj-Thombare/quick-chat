import React from "react";
import Image from "next/image";

export default function UserReviews() {
  return (
    <section className='w-full py-12 md:py-24 lg:py-32'>
      <div className='container px-4 md:px-6'>
        <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 md:mb-12'>
          What Our Users Say
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mx-10 px-10'>
          <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg'>
            <p className='text-gray-500 dark:text-gray-400 mb-4'>
              {`"ChatGroups has revolutionized how our team communicates. It's
              intuitive, fast, and secure. We couldn't be happier!"`}
            </p>
            <div className='flex items-center'>
              <Image
                src={`/images/user1.png`}
                height={300}
                width={300}
                alt='User 1'
                className='w-12 h-12 rounded-full mr-4'
              />
              <div>
                <p className='font-bold'>Jane Doe</p>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Project Manager, Microsoft.
                </p>
              </div>
            </div>
          </div>
          <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg'>
            <p className='text-gray-500 dark:text-gray-400 mb-4'>
              {`"The ability to create multiple groups has made organizing our club activities so much easier. Highly recommended!"`}
            </p>
            <div className='flex items-center'>
              <Image
                src={`/images/user2.png`}
                height={300}
                width={300}
                alt='User 2'
                className='w-12 h-12 rounded-full mr-4'
              />
              <div>
                <p className='font-bold'>John Smith</p>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Community Organizer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
