import ChatBase from "@/components/chat/ChatBase";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const chatId = (await params).id;
  return (
    <div>
      <h1>Hello, Im Chat!</h1>
      <ChatBase groupId={chatId} />
    </div>
  );
};

export default page;
