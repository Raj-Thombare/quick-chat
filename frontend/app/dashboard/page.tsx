import DashNav from "@/components/dashboard/DashNav";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import CreateChat from "@/components/groupChats/CreateChat";

const page = async () => {
  const session: CustomSession | null = await getServerSession(authOptions);
  return (
    <div>
      <DashNav
        name={session?.user?.name as string}
        image={session?.user?.image ?? undefined}
      />
      <div className='container'>
        <div className='flex justify-end mt-10'>
          <CreateChat />
        </div>
      </div>
    </div>
  );
};

export default page;
