import React from 'react'
import { Button } from '@/components/ui/button'
import { PenBox, Trash } from "lucide-react";
import { useState } from 'react';
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { toast } from "sonner";
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
import EmojiPicker from 'emoji-picker-react';
import { useUser } from '@clerk/nextjs';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
function EditBudget({Budgetinfo,refreshdata}) {
    const [selectedEmoji, setSelectedEmoji] = useState(Budgetinfo?.icon);
    const [openEmojiPicker, setEmojiPicker] = useState(false);
    const [name, setName] = useState(Budgetinfo?.name);
    const [amount,setAmount]= useState(Budgetinfo?.amount);
    const {user} = useUser();

    const onUpdateBudget = async () => {
        try {
          // Update the budget with the given ID
          const updateResult = await db.update(Budgets)
            .set({
                name:name,
                amount:amount,
                icon:selectedEmoji
            })
            .where(eq(Budgets.id,Budgetinfo.id))
            .returning();
      
          // Check if the budget was successfully updated
          if (updateResult.length > 0) {
            toast('Budget Updated Successfully')
           refreshdata();
            // Optionally, you can perform additional actions after successful update
            // For example, route to a different page or show a success message
          } else {
            toast.error('Failed to update the budget.');
          }
        } catch (error) {
          console.error("Error updating budget:", error);
          toast.error('An error occurred while updating the budget.');
        }
      };
      
  return (
    <div>
        
        <Dialog>
        <DialogTrigger asChild>
        <Button className="flex gap-2" ><PenBox/>Edit</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
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
                    defaultValue= {Budgetinfo?.name}
                    onChange={(e)=>{
                        setName(e.target.value)
                    }}
                    />
                </div>
                <div className="mt-2">
                    <h2 className="text-black font-medium my-1"> Budget Amount</h2>
                    <Input placeholder='e.g 1000$'
                    defaultValue= {Budgetinfo?.amount}
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
                    onUpdateBudget()
                }
                className='w-full mt-2'>Update Budget</Button>
          </DialogClose>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditBudget