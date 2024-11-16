"use client";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import { HomeIcon, LayoutGrid, MenuIcon, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

function DashboardHeader() {
  const menuList = [
    { id: 1, name: "Dashboard", link: "/dashboard", icon: LayoutGrid },
    { id: 2, name: "Budgets", link: "/dashboard/budgets", icon: PiggyBank },
    { id: 3, name: "Expenses", link: "/dashboard/expenses", icon: ReceiptText },
    { id: 4, name: "Home", link: "/", icon: HomeIcon },
  ];

  const path = usePathname();
  return (
    <div className="p-2 border-b shadow-md flex justify-between ">
      <div className="p-5 ">
        <NavigationMenu className='sm:hidden'>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer hover:bg-white rounded-md hover:text-primary hover:border border-indigo-900 ">
               <MenuIcon/>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>
                  {menuList.map((menu, index) => (
                    <Link href={menu.link} key={index}>
                      <h2
                        className={`flex gap-4 items-center w-[200px] text-gray-500 font-medium p-5 cursor-pointer hover:bg-white rounded-md hover:text-primary hover:border hover:border-indigo-900 ${
                          path == menu.link &&
                          "border text-primary bg-white border-indigo-900"
                        }`}
                      >
                        <menu.icon />
                        {menu.name}
                      </h2>
                    </Link>
                  ))}
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className=" flex items-center justify-between ">
        <UserButton />
      </div>
    </div>
  );
}

export default DashboardHeader;
