import { ChatGroupUserType } from "@/types";
import React from "react";

export default function ChatSidebar({
  users,
}: {
  users: Array<ChatGroupUserType> | [];
}) {
  return (
    <div className='hidden md:block w-64 bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700'>
      <div className='p-4'>
        <h1 className='text-lg font-semibold mb-4'>Users</h1>
        <div className='max-w-full table'>
          {users.length > 0 &&
            users?.map((item, index) => (
              <div key={index} className='flex items-center space-x-2 mb-2'>
                <span className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full'>
                  <span className='flex h-full w-full items-center justify-center rounded-full bg-gray-200'>
                    {item.name[0]}
                  </span>
                </span>
                <span>{item.name}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
