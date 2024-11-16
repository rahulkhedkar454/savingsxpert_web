import { SignIn } from "@clerk/nextjs";
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
function page() {
  return (
    <div>
         <section className="bg-white">
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
    <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
      <img
        alt=""
        src="/login.jpg"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />

      <div className="hidden lg:relative lg:block lg:p-12">
        <a className="block text-white" href="#">
          <span className="sr-only">Home</span>
         
        </a>

      
      </div>
    </section>

    <main
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
      <div className="max-w-xl lg:max-w-3xl">
        <div className="relative -mt-16 block lg:hidden">
         
        </div>
        <SignIn path="/sign-in" />
      </div>
    </main>
  </div>
</section>
    </div>
  )
}

export default page

