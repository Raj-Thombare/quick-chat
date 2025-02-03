import React from "react";

const Insights = () => {
  return (
    <section className='w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800'>
      <div className='container px-4 md:px-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
          <div>
            <h3 className='text-4xl font-bold mb-2'>1M+</h3>
            <p className='text-xl text-gray-500 dark:text-gray-400'>
              Active Users
            </p>
          </div>
          <div>
            <h3 className='text-4xl font-bold mb-2'>500K+</h3>
            <p className='text-xl text-gray-500 dark:text-gray-400'>
              Groups Created
            </p>
          </div>
          <div>
            <h3 className='text-4xl font-bold mb-2'>99.9%</h3>
            <p className='text-xl text-gray-500 dark:text-gray-400'>Uptime</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Insights;
