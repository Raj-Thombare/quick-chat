import { ChatGroupUserType } from "@/types";
import React from "react";

export default function ChatSidebar({
  users,
  onlineUsers,
}: {
  users: Array<ChatGroupUserType> | [];
  onlineUsers: string[] | [];
}) {
  return (
    <div className='hidden md:block w-64 bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700'>
      <div className='p-4'>
        <div className='flex flex-row justify-between items-center mb-4'>
          <h2 className='text-lg font-semibold'>Users</h2>
          <span className='text-white font-medium text-sm rounded-xl px-2 py-1  bg-green-700'>
            {onlineUsers.length} online
          </span>
        </div>
        <div className='max-w-full table'>
          {users.length > 0 &&
            users?.map((item, index) => (
              <div key={index} className='flex items-center space-x-2 mb-2'>
                <span className='relative flex h-10 w-10 shrink-0  rounded-full z-0'>
                  <div className='relative flex h-full w-full items-center justify-center rounded-full bg-gray-200 z-0'>
                    {item.name[0]}
                  </div>
                  <span className='rounded-full absolute inline-flex bg-green-600 w-3 h-3 bottom-0 right-0 z-10 border border-white dark:border-gray-900'></span>
                </span>
                <span>{item.name}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
