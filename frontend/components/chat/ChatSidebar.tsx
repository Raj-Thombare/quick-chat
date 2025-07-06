import { ChatGroupUserType } from "@/types";
import React from "react";

interface ChatSidebarProps {
  users: Array<ChatGroupUserType & { isOnline?: boolean }>;
  onlineUsers: string[];
  currentUserId?: string;
}

export default function ChatSidebar({
  users,
  onlineUsers,
  currentUserId,
}: ChatSidebarProps) {

  const sortedUsers = [...users].reverse();

  return (
    <div className='hidden md:block w-64 bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto'>
      <div className='p-4 sticky top-0 bg-gray-100 dark:bg-gray-900 z-10'>
        <div className='flex flex-row justify-between items-center mb-4'>
          <h2 className='text-lg font-semibold'>Users</h2>
          <span className='text-white font-medium text-sm rounded-xl px-2 py-1 bg-green-700'>
            {onlineUsers.length} online
          </span>
        </div>
      </div>

      <div className='px-4 pb-4 space-y-2'>
        {sortedUsers.map((user) => {
          const isOnline = onlineUsers.includes(user.id);
          const isCurrentUser = user.id === currentUserId;

          return (
            <div
              key={user.id}
              className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                isCurrentUser
                  ? "bg-blue-100 dark:bg-blue-900"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}>
              <span className='relative flex h-10 w-10 shrink-0 rounded-full'>
                <div
                  className={`flex h-full w-full items-center justify-center rounded-full ${
                    isCurrentUser
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                  }`}>
                  {user.name[0].toUpperCase()}
                </div>
                {isOnline && (
                  <span className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900' />
                )}
              </span>

              <div className='flex-1 min-w-0'>
                <p className='truncate font-medium'>
                  {user.name}
                  {isCurrentUser && (
                    <span className='ml-1 text-xs text-gray-500 dark:text-gray-400'>
                      (you)
                    </span>
                  )}
                </p>
                <p className='text-xs text-gray-500 dark:text-gray-400 truncate'>
                  {isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}