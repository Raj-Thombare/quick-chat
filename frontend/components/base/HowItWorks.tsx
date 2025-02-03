import React from "react";

const HowItWorks = () => {
  return (
    <section
      id='howitworks'
      className='w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800'>
      <div className='container px-4 md:px-6'>
        <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 md:mb-12'>
          How It Works
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <ReusableCard
            no='1'
            title='Sign Up'
            description='Create your account in seconds and get started for free.'
          />
          <ReusableCard
            no='2'
            title='Create or Join a Group'
            description='Start your own group or join an existing one with a simple passcode.'
          />
          <ReusableCard
            no='3'
            title='Start Chatting'
            description='Engage in real-time conversations with your group members.'
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

const ReusableCard = ({
  no,
  title,
  description,
}: {
  no: string;
  title: string;
  description: string;
}) => {
  return (
    <div className='flex flex-col items-center text-center shadow-none border-none rounded-none'>
      <div className='w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mb-4'>
        {no}
      </div>
      <h3 className='text-xl font-bold mb-2'>{title}</h3>
      <p className='text-gray-500 dark:text-gray-400'>{description}</p>
    </div>
  );
};
