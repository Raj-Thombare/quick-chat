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
    <header className='bg-white dark:bg-gray-800 shadow-md py-4 px-6 flex justify-between'>
      <div className='flex space-x-4 md:space-x-0 items-center'>
        <div className='md:hidden'>
          <MobileChatSidebar users={users} />
        </div>

        <h1 className='text-2xl font-bold'>{chatGroup.title}</h1>
        {/* <p>{new Date(chatGroup.created_at).toDateString()}</p> */}
      </div>
      <p>{user?.name}</p>
    </header>
  );
}
