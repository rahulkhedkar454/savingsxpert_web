import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Footer from "./Footer";

function Hero() {
  return (
    <div>
      {/* <section
        className=" text-white relative  lg:bg-cover lg:bg-center lg:bg-no-repeat"
        style={{ backgroundImage: "url('/piggybank1.jpg')" }}
      >
        <div className="mx-auto max-w-screen-xl px-2 py-6 lg:flex ">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-primary text-3xl font-extrabold sm:text-5xl">
              Manage Your Budget
              <span className="sm:block text-primary">
                {" "}
                Control Your Money{" "}
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed text-black">
              Start creating Budget and save lot of money .
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded border bg-primary px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-primary hover:border-blue-500 focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href="/dashboard"
              >
                Get Started
              </a>
            </div>
            <Image
              src={"/savingsXpert.png"}
              width={1700}
              height={1700}
              className="w-full mt-5 rounded-lg border-2"
            />
          </div>
        </div>
      </section> */}
      {/*
  Heads up! 👋

  This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
*/}

<section>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
      <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
        <Image
          alt=""
          src="/piggybank1.jpg"
          width={400}
          height={400}
          className="absolute inset-0 h-full w-full object-cover rounded-3xl "
        />
      </div>

      <div className="lg:py-10">
        <h1 className="text-primary text-3xl font-extrabold sm:text-5xl">
              Manage Your Budget
              <span className="sm:block text-primary">
                {" "}
                Control Your Money{" "}
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-lg/relaxed text-black">
            Welcome to your journey toward financial freedom! save for a big purchase, or simply gain better control over your finances, creating a budget is the first and most crucial step. Here’s how you can start budgeting and save a lot of money:
            </p>
       
        <Link href={'/dashboard'}>
        <Button className='mt-10'>Get Started</Button>
        </Link>
       
        
      </div>
      
    </div>
    <div className="flex justify-center items-center mt-10">
    <Image
          alt=""
          src="/savingsXpert.png"
          width={400}
          height={400}
          className=" rounded-3xl  h-full w-[800px] object-cover "
        />
    </div>
  </div>
  <Footer/>
</section>
    </div>
  );
}

export default Hero;
