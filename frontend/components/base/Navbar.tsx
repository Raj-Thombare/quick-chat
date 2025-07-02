"use client";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import LoginModal from "../auth/LoginModal";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import ProfileMenu from "../auth/ProfileMenu";
import { bricolage_grotesque } from "@/lib/font";
import { MoonIcon, SunIcon } from "lucide-react";

export default function Navbar({ user }: { user?: CustomUser }) {
  const pathname = usePathname();

  return (
    <nav
      className={`${bricolage_grotesque} w-full p-4 lg:p-6 bg-white dark:bg-gray-800`}>
      <div className='container mx-auto flex items-center justify-between'>
        <Link
          href='/'
          className='text-xl md:text-2xl font-bold flex items-center justify-center'>
          <MessageCircle />
          <span className='text-xl sm:text-2xl font-extrabold ml-1'>
            QuickChat
          </span>
        </Link>
        {pathname !== "/dashboard" && (
          <nav className='hidden md:flex space-x-6'>
            <Link
              href='#features'
              className='text-base font-medium hover:text-primary'>
              Features
            </Link>
            <Link
              href='#howitworks'
              className='text-base font-medium hover:text-primary'>
              How It Works
            </Link>
            <Link
              href='#testimonials'
              className='text-base font-medium hover:text-primary'>
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
          <div>
            {user ? (
              <Link href='/dashboard'>
                <Button>Dashboard</Button>
              </Link>
            ) : (
              <div className='flex items-center space-x-4'>
                {false ? (
                  <MoonIcon className='w-[20px] h-[20px] max-sm:w-[16px] max-sm:h-[16px]' />
                ) : (
                  <SunIcon className='w-5 h-5 max-sm:w-[16px] max-sm:h-[16px]' />
                )}
                <LoginModal />
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
