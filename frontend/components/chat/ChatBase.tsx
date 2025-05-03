"use client";

import { useEffect, useMemo, useState } from "react";
import ChatSidebar from "./ChatSidebar";
import { ChatGroupType, ChatGroupUserType, MessageType } from "@/types";
import ChatNav from "./ChatNav";
import ChatUserDialog from "./ChatUserDialog";
import Chats from "./Chats";
import { getSocket } from "@/lib/socket.config";

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
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const userId = chatUser?.id || chatUser?.name;

  const socket = useMemo(() => {
    const socket = getSocket();
    socket.auth = {
      room: group.id,
      userId: userId,
    };
    return socket.connect();
  }, [group.id, userId]);

  useEffect(() => {
    const storedUser = localStorage.getItem(group.id);
    if (storedUser) {
      setChatUser(JSON.parse(storedUser));
    }
  }, [group.id]);

  useEffect(() => {
    if (!socket) return;

    const handleOnlineUsers = (ids: string[]) => {
      setOnlineUsers(ids);
    };

    const handleUserConnected = (id: string) => {
      setOnlineUsers((prev) => (prev.includes(id) ? prev : [...prev, id]));
    };

    const handleUserDisconnected = (id: string) => {
      setOnlineUsers((prev) => prev.filter((uid) => uid !== id));
    };

    socket.on("onlineUsers", handleOnlineUsers);
    socket.on("userConnected", handleUserConnected);
    socket.on("userDisconnected", handleUserDisconnected);

    socket.emit("getOnlineUsers");

    return () => {
      socket.off("onlineUsers", handleOnlineUsers);
      socket.off("userConnected", handleUserConnected);
      socket.off("userDisconnected", handleUserDisconnected);
    };
  }, [socket]);

  return (
    <div className='flex h-screen bg-white dark:bg-gray-800'>
      <ChatSidebar users={users} onlineUsers={onlineUsers} />
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
