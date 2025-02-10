"use client";

import ChatSidebar from "./ChatSidebar";
import { ChatGroupType, ChatGroupUserType, MessageType } from "@/types";
import ChatNav from "./ChatNav";
import { useEffect, useState } from "react";
import ChatUserDialog from "./ChatUserDialog";
import Chats from "./Chats";

const ChatBase = ({
  group,
  users,
  oldMessages,
}: {
  group: ChatGroupType;
  users: ChatGroupUserType[];
  oldMessages: MessageType[] | [];
}) => {
  const [open, setOpen] = useState(true);
  const [chatUser, setChatUser] = useState<ChatGroupUserType>();

  useEffect(() => {
    const data = localStorage.getItem(group.id);
    if (data) {
      const pData = JSON.parse(data);
      setChatUser(pData);
    }
  }, [group.id]);

  return (
    <div className='flex h-screen bg-white dark:bg-gray-800'>
      <ChatSidebar users={users} />
      <main className='flex-1 flex flex-col'>
        {open ? (
          <ChatUserDialog open={open} setOpen={setOpen} group={group} />
        ) : (
          <ChatNav chatGroup={group} users={users} user={chatUser} />
        )}

        <Chats group={group} oldMessages={oldMessages} chatUser={chatUser} />
      </main>
    </div>
  );
};

export default ChatBase;
