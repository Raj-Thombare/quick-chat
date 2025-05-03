import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ChatGroupType, ChatGroupUserType, MessageType } from "@/types";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import axios from "axios";
import { CHATS_URL } from "@/lib/apiEndPoints";

export default function Chats({
  group,
  oldMessages,
  chatUser,
  socket,
}: {
  group: ChatGroupType;
  oldMessages: Array<MessageType> | [];
  chatUser?: ChatGroupUserType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket?: any;
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<MessageType>>(oldMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(`${CHATS_URL}/${group.id}`);
        setMessages(data.data);
        localStorage.setItem(`chat_${group.id}`, JSON.stringify(data.data));
      } catch (err) {
        console.error("Error fetching messages", err);
      }
    };

    fetchMessages();
  }, [group.id]);

  useEffect(() => {
    if (!socket) return;

    const handleIncomingMessage = (newMessage: MessageType) => {
      setMessages((prevMessages) => {
        const messageExists = prevMessages.some(
          (msg) => msg.id === newMessage.id
        );
        if (messageExists) return prevMessages;

        const updatedMessages = [...prevMessages, newMessage];
        localStorage.setItem(
          `chat_${group.id}`,
          JSON.stringify(updatedMessages)
        );
        return updatedMessages;
      });
    };

    socket.on("message", handleIncomingMessage);

    return () => {
      socket.off("message", handleIncomingMessage);
    };
  }, [socket, group.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!message.trim()) return;

    const payload: MessageType = {
      id: uuidv4(),
      message,
      name: chatUser?.name ?? "Unknown",
      created_at: new Date().toISOString(),
      group_id: group.id,
    };

    if (socket) {
      socket.emit("message", payload);
    }

    const updatedMessages = [...messages, payload];
    setMessages(updatedMessages);
    setMessage("");

    localStorage.setItem(`chat_${group.id}`, JSON.stringify(updatedMessages));

    try {
      await axios.post(CHATS_URL, {
        chats: [payload],
        group_id: group.id,
      });
    } catch (error) {
      console.error("Failed to save to DB", error);
    }
  };

  return (
    <div className='flex h-[90vh]'>
      <div className='flex flex-col h-full flex-1'>
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
            <Button
              type='submit'
              className='h-10 px-4 py-2'
              disabled={!message.trim()}>
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
