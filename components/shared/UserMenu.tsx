"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { useProfile } from "@/hooks/use-profile";
import { TicketCheck, LogOut, User, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { InstallButton } from "./InstallButton";

export default function UserMenu() {
  // const { data } = useProfile();

  const data = {
    name: "John Doe",
    email: "ahmedalabadla@gmail.com",
    avatar: null,
  };
  // const handleClickLogout = async () => {
  //   await logout().then(() => {
  //     toast.success("Logout successful!", {
  //       duration: 5000,
  //     });

  //     redirect("/auth/login");
  //   });
  // };

  const logged = false;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {logged ? (
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <Avatar className="w-9 h-9 border">
              <AvatarImage
                src={data?.avatar ?? ""}
                alt="avatar"
                className="object-contain"
              />

              <AvatarFallback className="text-lg">
                {data?.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="hover:text-primary dark:hover:bg-gray-700 "
          >
            <User className="size-5" />
          </Button>
        )}
      </DropdownMenuTrigger>
      {logged ? (
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1.5">
              <p className="text-sm font-medium leading-none">{data?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {data?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <InstallButton />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/orders"
              className="cursor-pointer flex w-full items-center"
            >
              <TicketCheck className="mr-2 h-4 w-4 text-blue-500" />
              <span>My Orders</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/profile"
              className="cursor-pointer flex w-full items-center"
            >
              <User className="mr-2 h-4 w-4 text-primary" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            // onClick={handleClickLogout}
          >
            <LogOut className="mr-2 h-4 w-4 text-red-500" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1.5">
              <p className="text-sm font-medium leading-none">Welcome</p>
              <p className="text-xs leading-none text-muted-foreground">
                Please log in to access your account
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href="/auth/login"
              className="cursor-pointer flex w-full items-center"
            >
              <LogIn className="mr-2 h-4 w-4 " />
              <span>Login</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/auth/register"
              className="cursor-pointer flex w-full items-center"
            >
              <UserPlus className="mr-2 h-4 w-4 " />
              <span>Register</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
