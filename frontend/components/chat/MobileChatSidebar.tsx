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
}: {
  users: Array<ChatGroupUserType> | [];
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <HamburgerMenuIcon width={20} height={20} />
      </SheetTrigger>
      <SheetContent side='left' className='bg-muted'>
        <SheetHeader>
          <SheetTitle className='text-lg font-semibold mb-4'>Users</SheetTitle>
        </SheetHeader>
        <div className='max-w-full table'>
          {users.length > 0 &&
            users.map((item, index) => (
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
      </SheetContent>
    </Sheet>
  );
}
