"use client"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Headers() {

  const {user,isSignedIn}= useUser();
  return (
    <div className='p-5 flex justify-between items-center border shadow-sm'>
    {/* <Image src={'/SavingsXpert-removebg-preview.png' } height={200} width={200}/> */}
    <Link href={'/'} className=' cursor-pointer'>
    <h1 className='font-bold text-indigo-900 flex text-3xl'>Savings<span className='text-gray-500'>Xpert</span> <Image src={'/money-bag.png' } height={30} width={40}/></h1> 
    </Link>
    {
      isSignedIn ? <UserButton/>:
      <Link href={'/sign-in'}>
      <Button>Get Started</Button>
      </Link>
    }
    
    </div>
  )
}

export default Headers