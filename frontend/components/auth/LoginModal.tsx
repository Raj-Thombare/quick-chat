"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";

const LoginModal = () => {
  const handleGoogleLogin = () => {
    signIn("google", {
      redirect: true,
      callbackUrl: "/dashboard",
    });
  };

  const handleGithubLogin = () => {
    signIn("github", {
      redirect: true,
      callbackUrl: "/dashboard",
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Get Started</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-2xl'>Welcome to QuickChat</DialogTitle>
          <DialogDescription>
            QuickChat makes it effortless to create secure chat links and start
            conversations in seconds.
          </DialogDescription>
        </DialogHeader>
        <Button variant='outline' onClick={handleGoogleLogin}>
          <Image
            src={`/images/google.png`}
            className='mr-4'
            width={25}
            height={25}
            alt='google_logo'
          />
          Continue with Google
        </Button>
        <Button variant='outline' onClick={handleGithubLogin}>
          <Image
            src={`/images/github.png`}
            className='mr-4'
            width={25}
            height={25}
            alt='github_logo'
          />
          Continue with Github
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
