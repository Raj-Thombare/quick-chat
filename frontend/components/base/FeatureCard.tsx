import React from "react";
import { Card } from "@/components/ui/card";

export default function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactElement;
  title: string;
  description: string;
}) {
  return (
    <Card className='flex shadow-none border-none rounded-none flex-col items-center text-center'>
      <div className='text-3xl mb-4'>{icon}</div>
      <h3 className='text-xl font-bold mb-2'>{title}</h3>
      <p className='text-gray-500 dark:text-gray-400'>{description}</p>
    </Card>
  );
}
