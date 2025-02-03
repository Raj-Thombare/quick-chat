"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createChatSchema,
  createChatSchemaType,
} from "@/validation/chatSchema";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { CHAT_GROUP_URL } from "@/lib/apiEndPoints";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";
import { clearCache } from "@/actions/common";

const CreateChat = ({ user }: { user: CustomUser | null }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createChatSchemaType>({
    resolver: zodResolver(createChatSchema),
  });

  const onSubmit = async (payload: createChatSchemaType) => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        CHAT_GROUP_URL,
        {
          ...payload,
          user_id: user?.id,
        },
        {
          headers: {
            Authorization: user?.token,
          },
        }
      );

      if (data.message) {
        clearCache("dashboard");
        setLoading(false);
        setOpen(false);
        toast.success("Chat Group created successfully!");
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong! Please try again later.");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create a Group</Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold'>
            Create a Group
          </DialogTitle>
        </DialogHeader>
        <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
          <div className='mt-4'>
            <Label
              htmlFor='groupName'
              className='block text-sm font-medium mb-1'>
              Group Name
            </Label>
            <Input
              id='groupName'
              className='border border-black'
              {...register("title")}
            />
            <span className='text-red-500'>{errors?.title?.message}</span>
          </div>
          <div className='mt-4'>
            <Label
              htmlFor='passcode'
              className='block text-sm font-medium mb-1'>
              Passcode
            </Label>
            <Input
              id='passcode'
              className='border border-black/60'
              {...register("passcode")}
            />
            <span className='text-red-500'>{errors?.passcode?.message}</span>
          </div>
          <div className='mt-4'>
            <Button disabled={loading} className='w-full px-4 h-10 py-2'>
              {!loading ? (
                "Create Group"
              ) : (
                <>
                  <Loader2 className='animate-spin' />
                  Please wait
                </>
              )}
            </Button>
          </div>
          <div className='mt-4 text-center space-y-1'>
            <Button
              variant='link'
              className='text-sm text-blue-500 hover:underline'>
              Join an existing group
            </Button>
            <Button
              variant='link'
              className='text-sm text-blue-500 hover:underline block'>
              <Link href='/login'> Sign up for an account</Link>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChat;
