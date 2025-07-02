import React from "react";
import Link from "next/link";
import { bricolage_grotesque } from "@/lib/font";

export default function Footer() {
  return (
    <footer
      className={`${bricolage_grotesque} flex flex-col justify-between gap-2 sm:flex-row py-6 mt-2 w-full shrink-0 items-center px-4 md:px-6`}>
      <p className='text-sm'>© 2025 QuickChat. All rights reserved.</p>

      <div className='sm:ml-auto flex gap-4 sm:gap-6 text-sm'>
        <span>
          Developed By
          <Link
            href={"https://rajthombare.xyz"}
            className='ml-1 underline-offset-2 text-red-500 font-bold'
            target='_blank'>
            Raj Thombare
          </Link>
        </span>
      </div>
    </footer>
  );
}
