"use client";

import { useEffect, useState, useMemo } from "react";
import ChatSidebar from "./ChatSidebar";
import { ChatGroupType, ChatGroupUserType, MessageType } from "@/types";
import ChatNav from "./ChatNav";
import ChatUserDialog from "./ChatUserDialog";
import Chats from "./Chats";
import { getSocket } from "@/lib/socket.config";

const ChatBase = ({
  group,
  users: initialUsers,
  oldMessages,
}: {
  group: ChatGroupType;
  users: ChatGroupUserType[];
  oldMessages: MessageType[] | [];
}) => {
  const [open, setOpen] = useState(true);
  const [chatUser, setChatUser] = useState<ChatGroupUserType>();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [users, setUsers] = useState<ChatGroupUserType[]>(initialUsers);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [socket, setSocket] = useState<any>(null);

  // Add user with duplicate protection
  const addUserSafely = (newUser: ChatGroupUserType) => {
    setUsers((prev) => {
      const exists = prev.some(
        (u) =>
          (u.id && newUser.id && u.id === newUser.id) ||
          (!u.id && !newUser.id && u.name === newUser.name)
      );
      return exists ? prev : [...prev, newUser];
    });
  };

  // Combine users with online status
  const usersWithStatus = useMemo(
    () =>
      users.map((user) => ({
        ...user,
        isOnline: onlineUsers.includes(user.id || user.name),
      })),
    [users, onlineUsers]
  );

  useEffect(() => {
    const storedUser = localStorage.getItem(group.id);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setChatUser(user);
      setOpen(false);
      addUserSafely(user);
    }
  }, [group.id]);

  useEffect(() => {
    if (!chatUser) return;

    const s = getSocket();
    s.auth = {
      room: group.id,
      userId: chatUser.id || chatUser.name,
      userName: chatUser.name,
      userData: chatUser, // Send complete user data
    };

    const connectedSocket = s.connect();
    setSocket(connectedSocket);

    // Emit join event with complete user data
    connectedSocket.emit("joinRoom", {
      room: group.id,
      user: chatUser,
    });

    // Handle full user list updates
    connectedSocket.on(
      "userListUpdated",
      (updatedUsers: ChatGroupUserType[]) => {
        setUsers(updatedUsers);
      }
    );

    // Handle individual user joins
    connectedSocket.on("userJoined", (newUser: ChatGroupUserType) => {
      addUserSafely(newUser);
    });

    return () => {
      connectedSocket.disconnect();
    };
  }, [chatUser, group.id]);

  useEffect(() => {
    if (!socket) return;

    const handleOnlineUsers = (ids: string[]) => {
      setOnlineUsers(ids);
      // Ensure current user is always online
      if (chatUser && !ids.includes(chatUser.id || chatUser.name)) {
        setOnlineUsers((prev) => [...prev, chatUser.id || chatUser.name]);
      }
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

    return () => {
      socket.off("onlineUsers", handleOnlineUsers);
      socket.off("userConnected", handleUserConnected);
      socket.off("userDisconnected", handleUserDisconnected);
    };
  }, [socket, chatUser]);

  return (
    <div className='flex h-screen bg-white dark:bg-gray-800'>
      <ChatSidebar
        users={usersWithStatus}
        onlineUsers={onlineUsers}
        currentUserId={chatUser?.id}
      />
      <main className='flex-1 flex flex-col'>
        {open ? (
          <ChatUserDialog
            open={open}
            setOpen={setOpen}
            group={group}
            onJoin={(user: ChatGroupUserType) => {
              setChatUser(user);
              localStorage.setItem(group.id, JSON.stringify(user));
              addUserSafely(user);
              setOnlineUsers((prev) => [...prev, user.id || user.name]);
              setOpen(false);
            }}
          />
        ) : (
          <ChatNav
            chatGroup={group}
            users={users}
            user={chatUser}
            onlineUsers={onlineUsers}
            currentUserId={chatUser?.id}
          />
        )}
        <Chats
          group={group}
          oldMessages={oldMessages}
          chatUser={chatUser}
          socket={socket}
        />
      </main>
    </div>
  );
};

export default ChatBase;