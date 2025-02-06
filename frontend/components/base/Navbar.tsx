"use client";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import LoginModal from "../auth/LoginModal";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import ProfileMenu from "../auth/ProfileMenu";

export default function Navbar({ user }: { user?: CustomUser }) {
  const pathname = usePathname();

  return (
    <header className='w-full py-4 px-4 lg:px-6 bg-white dark:bg-gray-800'>
      <div className='container mx-auto flex items-center justify-between'>
        <Link
          href='/'
          className='text-xl md:text-2xl font-bold flex items-center justify-center'>
          <MessageCircle />
          <span className='text-xl sm:text-2xl font-bold ml-2'>QuickChat</span>
        </Link>
        {pathname !== "/dashboard" && (
          <nav className='hidden md:flex space-x-6'>
            <Link
              href='#features'
              className='text-sm font-medium hover:text-primary'>
              Features
            </Link>
            <Link
              href='#howitworks'
              className='text-sm font-medium hover:text-primary'>
              How It Works
            </Link>
            <Link
              href='#testimonials'
              className='text-sm font-medium hover:text-primary'>
              Testimonials
            </Link>
          </nav>
        )}

        {pathname === "/dashboard" ? (
          user && (
            <ProfileMenu
              name={user?.name as string}
              image={user?.image ?? undefined}
            />
          )
        ) : (
          <>
            {user ? (
              <Link href='/dashboard'>
                <Button>Dashboard</Button>
              </Link>
            ) : (
              <LoginModal />
            )}
          </>
        )}
      </div>
    </header>
  );
}
