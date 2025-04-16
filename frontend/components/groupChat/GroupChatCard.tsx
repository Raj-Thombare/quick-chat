"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import GroupChatCardMenu from "./GroupChatCardMenu";
import { ChatGroupType } from "@/types";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function GroupChatCard({
  group,
  user,
}: {
  group: ChatGroupType;
  user: CustomUser;
}) {
  const router = useRouter();
  return (
    <Card>
      <CardHeader className='flex-row justify-between items-center '>
        <CardTitle className='text-2xl'>{group.title}</CardTitle>
        <GroupChatCardMenu user={user} group={group} />
      </CardHeader>
      <CardContent>
        <p>
          Passcode :-<strong>{group.passcode}</strong>
        </p>
        <p>Created At :-{new Date(group.created_at).toDateString()}</p>
        <div className='pt-4 flex justify-end'>
          <Button onClick={() => router.push(`/chat/${group.id}`)}>
            Join Room
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
