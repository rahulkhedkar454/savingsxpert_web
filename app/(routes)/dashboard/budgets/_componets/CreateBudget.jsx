"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { useUser } from '@clerk/nextjs'
import { toast } from "sonner";
function CreateBudget({refreshdata}) {
  const [selectedEmoji, setSelectedEmoji] = useState("😁");
  const [openEmojiPicker, setEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [amount,setAmount]= useState('');
  const {user} = useUser();
  const onCreateBudget=async()=>{
    const result = await db.insert(Budgets)
    .values({ name: name , amount : amount,createdBy:user?.primaryEmailAddress.emailAddress,icon: selectedEmoji })
    .returning({insertedId:Budgets.id})
      if(result){
        refreshdata();
       
        toast("Successfully created a new budget!");
      }
  }

  
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className=" bg-slat-100 p-10 rounded-md border-2 border-dashed
        items-center flex flex-col cursor-pointer hover:border-primary hover:shadow-md"
          >
            <h2 className="text-3xl">+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
               <Button
                    variant="outline"
                    size='lg'
                    className='text-lg'
                    onClick={() => setEmojiPicker(!openEmojiPicker)}
                  >
                    {selectedEmoji}
                  </Button>
                <div className="absolute z-20">
                  <EmojiPicker open={openEmojiPicker}
                  onEmojiClick={(e)=>
                   {
                    setSelectedEmoji(e.emoji)
                    setEmojiPicker(false)
                   } 
                  } />
                </div>
                <div className="mt-2">
                    <h2 className="text-black font-medium my-1"> Budget Name</h2>
                    <Input placeholder='e.g Home decoration'
                    onChange={(e)=>{
                        setName(e.target.value)
                    }}
                    />
                </div>
                <div className="mt-2">
                    <h2 className="text-black font-medium my-1"> Budget Amount</h2>
                    <Input placeholder='e.g 1000$'
                    type='number'
                    onChange={(e)=>{
                        setAmount(e.target.value)
                    }}
                    />
                </div>
                
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
           <Button disabled={!(name&&amount)}
                onClick={()=>
                    onCreateBudget()
                }
                className='w-full mt-2'>Create Budget</Button>
          </DialogClose>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
