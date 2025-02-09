import ChatBase from "@/components/chat/ChatBase";
import { fetchChatGroup, fetchChatUsers } from "@/fetch/groupFetch";
import { ChatGroupType, ChatGroupUserType } from "@/types";
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

  return (
    <div>
      <ChatBase group={group} users={users} />
    </div>
  );
};

export default page;
