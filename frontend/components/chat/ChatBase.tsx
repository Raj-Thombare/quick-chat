"use client";

import ChatSidebar from "./ChatSidebar";
import { ChatGroupType, ChatGroupUserType } from "@/types";
import ChatNav from "./ChatNav";
import { useState } from "react";
import ChatUserDialog from "./ChatUserDialog";

const ChatBase = ({
  group,
  users,
}: {
  group: ChatGroupType;
  users: ChatGroupUserType[];
}) => {
  const [open, setOpen] = useState(true);

  return (
    <div className='flex h-screen bg-white dark:bg-gray-800'>
      <ChatSidebar users={users} />
      <main className='flex-1 flex flex-col'>
        {open ? (
          <ChatUserDialog open={open} setOpen={setOpen} group={group} />
        ) : (
          <ChatNav chatGroup={group} users={users} />
        )}
      </main>
    </div>
  );
};

export default ChatBase;
