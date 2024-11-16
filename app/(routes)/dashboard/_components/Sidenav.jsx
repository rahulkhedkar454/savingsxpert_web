'use client'
import React from 'react'
import Image from 'next/image'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
function Sidenav() {
    const menuList = [
        { id: 1, name: "Dashboard", link: "/dashboard", icon: LayoutGrid },
        { id: 2, name: "Budgets", link: "/dashboard/budgets", icon:PiggyBank  },
        { id: 3, name: "Expenses", link: "/dashboard/expenses", icon: ReceiptText },
        { id: 4, name: "Upgrade", link: "/dashboard/upgrade", icon: ShieldCheck},
      ];
      
    const path = usePathname();
   
  return (
    <div className='h-screen  p-5 border shadow-md'>
         <Link href={'/'} className=' cursor-pointer'>
        <h1 className=' font-bold text-indigo-900 flex text-2xl'>Savings<span className='text-gray-500'>Xpert</span> <Image src={'/money-bag.png' } height={30} width={40}/></h1> 
        </Link>
       <div className='mt-5'>
       {
            menuList.map((menu,index) => (
                <Link href={menu.link} key={index}>
                <h2 className={`flex gap-2 items-center text-gray-500 font-medium p-5 cursor-pointer hover:bg-white rounded-md hover:text-primary hover:border hover:border-indigo-900 ${path==menu.link && 'border text-primary bg-white border-indigo-900'}`}>
                <menu.icon/>
                {menu.name}
                </h2>
                </Link>
            ))
        }
        </div> 
        <div className='fixed gap-2 flex p-5 bottom-12 items-center'>
            <UserButton/>
            Profile
        </div>
    </div>
  )
}

export default Sidenav