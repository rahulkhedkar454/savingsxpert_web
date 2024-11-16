"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Budgets, Expenses } from "@/utils/schema";
import { toast } from "sonner";
import moment from "moment";
function AddExpenses({budgetId,refreshdata}) {
    const [name, setName] = useState('');
    const [amount,setAmount]= useState('');
    const resetForm = () => {
        setName('');
        setAmount('');
    };
   
    const {user} = useUser();
    const addExpenses = async () => {
        try {
            // Assuming Expenses model contains the structure of the Expenses table
            const result = await db.insert(Expenses)
                .values({ name: name, amount: amount, budgetId: budgetId, createdAt: moment().format('DD/MM/yyy') })
                .returning(); // No need to specify returning fields if not needed
    
            if (result) {
                refreshdata()
                toast("New Expenses Successfully created!");
                resetForm();
            }
           
        } catch (error) {
            console.error('Error adding expenses:', error);
            // Handle the error appropriately (e.g., show error message to the user)
        }
    };
    

  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1"> Expense Name</h2>
        <Input
          placeholder="e.g kitchen decoration"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          placeholder="e.g 1000"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      </div>
      <Button disabled={!(name&&amount)}
                onClick={()=>
                    addExpenses()
                }
                className='w-full mt-2'>Add New Expenses</Button>
    </div>
  );
}

export default AddExpenses;
