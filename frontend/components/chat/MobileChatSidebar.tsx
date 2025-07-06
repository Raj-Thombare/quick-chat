"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { ChatGroupUserType } from "@/types";

export default function MobileChatSidebar({
  users,
  onlineUsers,
  currentUserId,
}: {
  users: Array<ChatGroupUserType> | [];
  onlineUsers: string[];
  currentUserId?: string;
}) {
  const sortedUsers = [...users].reverse();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <HamburgerMenuIcon width={20} height={20} />
      </SheetTrigger>
      <SheetContent side='left' className='bg-muted flex flex-col p-0'>
        <SheetHeader className='p-4'>
          <SheetTitle className='text-lg font-semibold mb-2'>
            <div className='flex items-center'>
              <h2 className='text-lg font-semibold'>Users</h2>
              <span className='text-white font-medium text-sm rounded-xl px-2 py-1 ml-3 bg-green-700'>
                {onlineUsers.length} online
              </span>
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className='flex-1 overflow-y-auto px-4 pb-4 space-y-2'>
          {users.length > 0 &&
            sortedUsers.map((user) => {
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
      </SheetContent>
    </Sheet>
  );
}
