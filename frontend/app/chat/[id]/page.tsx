import ChatBase from "@/components/chat/ChatBase";
import { fetchChats } from "@/fetch/chatsFetch";
import { fetchChatGroup, fetchChatUsers } from "@/fetch/groupFetch";
import { ChatGroupType, ChatGroupUserType, MessageType } from "@/types";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const chatId = (await params).id;

  if (chatId.length !== 36) {
    return notFound();
  }
  const group: ChatGroupType | null = await fetchChatGroup(chatId);

  if (group === null) {
    return notFound();
  }

  const users: Array<ChatGroupUserType> | [] = await fetchChatUsers(chatId);
  
  const chats: Array<MessageType> | [] = await fetchChats(chatId);

  return (
    <div>
      <ChatBase group={group} users={users} oldMessages={chats} />
    </div>
  );
};

export default page;
