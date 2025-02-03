import React from "react";
import ProfileMenu from "../auth/ProfileMenu";
import { MessageCircle } from "lucide-react";

const DashNav = async ({ name, image }: { name: string; image?: string }) => {
  return (
    <nav className='px-4 py-2 h-14 flex justify-between items-center'>
      <h1 className='text-xl md:text-2xl font-bold flex items-center justify-center'>
        <span>
          <MessageCircle />
        </span>
        <p className='ml-2'>QuickChat</p>
      </h1>
      <div className='flex items-center space-x-2 md:space-x-6 text-gray-700'>
        <ProfileMenu name={name} image={image} />
      </div>
    </nav>
  );
};

export default DashNav;
