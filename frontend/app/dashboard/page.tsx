import { getServerSession } from "next-auth";
import React from "react";
import {
  authOptions,
  CustomSession,
  CustomUser,
} from "../api/auth/[...nextauth]/options";
import CreateChat from "@/components/groupChat/CreateChat";
import Navbar from "@/components/base/Navbar";
import { fetchChatGroups } from "@/fetch/groupFetch";
import { ChatGroupType } from "@/types";
import GroupChatCard from "@/components/groupChat/GroupChatCard";

const page = async () => {
  const session: CustomSession | null = await getServerSession(authOptions);

  const groups: ChatGroupType[] | [] = await fetchChatGroups(
    session?.user?.token as string
  );
  console.log(groups);
  return (
    <>
      <Navbar user={session?.user} />
      <div className='container mx-auto px-6'>
        <div className='flex justify-end mt-10'>
          <CreateChat user={session?.user as CustomUser} />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {groups.length > 0 &&
            groups.map((item, index) => (
              <GroupChatCard
                group={item}
                key={index}
                user={session?.user as CustomUser}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default page;
