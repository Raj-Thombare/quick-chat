"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import axios from "axios";
import { CHAT_GROUP_USERS_URL } from "@/lib/apiEndPoints";
import { toast } from "sonner";
import { ChatGroupType, ChatGroupUserType } from "@/types";

export default function ChatUserDialog({
  open,
  setOpen,
  group,
  onJoin,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  group: ChatGroupType;
  onJoin: (user: ChatGroupUserType) => void;
}) {
  const params = useParams();
  const [state, setState] = useState({
    name: "",
    passcode: "",
  });

  useEffect(() => {
    const data = localStorage.getItem(params["id"] as string);
    if (data) {
      const jsonData = JSON.parse(data);
      if (jsonData?.name && jsonData?.group_id) {
        setOpen(false);
        onJoin(jsonData);
      }
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (group.passcode !== state.passcode) {
      toast.error("Please enter correct passcode!");
      return;
    }

    try {
      const { data } = await axios.post(CHAT_GROUP_USERS_URL, {
        name: state.name,
        group_id: params["id"] as string,
      });

      const user = data?.data;
      localStorage.setItem(params["id"] as string, JSON.stringify(user));

      onJoin(user); 
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again!");
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Name and Passcode</DialogTitle>
          <DialogDescription>
            Add your name and passcode to join the room
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='mt-2'>
            <Input
              placeholder='Enter your name'
              value={state.name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
              required
            />
          </div>
          <div className='mt-2'>
            <Input
              placeholder='Enter your passcode'
              value={state.passcode}
              onChange={(e) => setState({ ...state, passcode: e.target.value })}
              required
            />
          </div>
          <div className='mt-4'>
            <Button type='submit' className='w-full'>
              Join
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
