import React from "react";
import FeatureCard from "./FeatureCard";
import { Users, MessageCircle, Lock } from "lucide-react";

export default function FeatureSection() {
  return (
    <section id='features' className='w-full py-12 md:py-24 lg:py-32'>
      <div className='container px-4 md:px-6'>
        <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 md:mb-12'>
          Key Features
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <FeatureCard
            icon={<Users size={50} />}
            title='Group Creation'
            description='Easily create and manage groups for different projects or interests.'
          />
          <FeatureCard
            icon={<MessageCircle size={50} />}
            title='Real-time Chat'
            description='Communicate instantly with group members through our real-time messaging system.'
          />
          <FeatureCard
            icon={<Lock size={50} />}
            title='Secure & Private'
            description='End-to-end encryption ensures your conversations remain private and secure.'
          />
        </div>
      </div>
    </section>
  );
}
