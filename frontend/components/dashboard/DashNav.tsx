import React from "react";
import ProfileMenu from "../auth/ProfileMenu";
import { getServerSession } from "next-auth";
import {
  authOptions,
  CustomSession,
} from "@/app/api/auth/[...nextauth]/options";

const DashNav = async () => {
  const session: CustomSession | null = await getServerSession(authOptions);
  return (
    <nav className='p-6 flex justify-between items-center bg-white shadow-sm'>
      <h1 className='text-xl md:text-2xl font-extrabold'>QuickChat</h1>
      <div className='flex items-center space-x-2 md:space-x-6 text-gray-700'>
        <ProfileMenu
          name={session?.user?.name as string}
          image={session?.user?.image ?? undefined}
        />
      </div>
    </nav>
  );
};

export default DashNav;
