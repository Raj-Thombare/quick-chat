import React, { useEffect, useMemo, useRef, useState } from "react";
import { getSocket } from "@/lib/socket.config";
import { v4 as uuidv4 } from "uuid";
import { ChatGroupType, ChatGroupUserType, MessageType } from "@/types";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";

export default function Chats({
  group,
  oldMessages,
  chatUser,
}: {
  group: ChatGroupType;
  oldMessages: Array<MessageType> | [];
  chatUser?: ChatGroupUserType;
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<MessageType>>(oldMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const socket = useMemo(() => {
    const socket = getSocket();
    socket.auth = {
      room: group.id,
    };
    return socket.connect();
  }, []);

  useEffect(() => {
    socket.on("message", (data: MessageType) => {
      console.log("The message is", data);
      setMessages((prevMessages) => [...prevMessages, data]);
      scrollToBottom();
    });

    return () => {
      socket.close();
    };
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const payload: MessageType = {
      id: uuidv4(),
      message: message,
      name: chatUser?.name ?? "Unknown",
      created_at: new Date().toISOString(),
      group_id: group.id,
    };

    socket.emit("message", payload);
    setMessage("");
    setMessages([...messages, payload]);
  };

  return (
    <div className='flex flex-col h-[94vh]'>
      <div className='flex-1 overflow-y-auto flex flex-col-reverse p-4'>
        <div ref={messagesEndRef} />
        <div className='flex flex-col gap-2 p-4'>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col max-w-sm ${
                message.name === chatUser?.name
                  ? "self-end items-end"
                  : "self-start items-start"
              }`}>
              <div className='text-xs text-gray-500 px-2 mb-1'>
                {message.name} •{" "}
                {new Date(message.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div
                className={`rounded-lg p-3 ${
                  message.name === chatUser?.name
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}>
                {message.message}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Separator orientation='horizontal' />

      <form onSubmit={handleSubmit} className='px-4 py-3 flex items-center'>
        <div className='flex space-x-2 justify-between w-full'>
          <input
            type='text'
            placeholder='Type your message...'
            value={message}
            className='flex h-10 w-full p-2 border rounded-lg outline-none focus:ring-1 focus:ring-gray-300'
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type='submit' className='h-10 px-4 py-2'>
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
