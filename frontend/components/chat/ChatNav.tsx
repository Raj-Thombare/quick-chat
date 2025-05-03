import React from "react";
import MobileChatSidebar from "./MobileChatSidebar";
import { ChatGroupType, ChatGroupUserType } from "@/types";

export default function ChatNav({
  chatGroup,
  users,
  user,
}: {
  chatGroup: ChatGroupType;
  users: Array<ChatGroupUserType> | [];
  user?: ChatGroupUserType;
}) {
  return (
    <header className='bg-white dark:bg-gray-800 shadow-md py-2 px-6 flex justify-between items-center'>
      <div className='flex space-x-4 md:space-x-0 items-center'>
        <div className='md:hidden'>
          <MobileChatSidebar users={users} />
        </div>

        <div>
          <h1 className='text-2xl font-bold'>{chatGroup.title}</h1>
          <p className='text-sm font-semibold text-gray-700'>
            {users.length} Participants
          </p>
        </div>
      </div>
      <p>{user?.name}</p>
    </header>
  );
}
