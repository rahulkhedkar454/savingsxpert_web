"use client";
import { db } from "@/utils/dbConfig";
import React, { useState, useEffect } from "react";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "../../budgets/_componets/BudgetItem";
import AddExpenses from "../_components/AddExpenses";
import ExpensesListTable from "../_components/ExpensesListTable";
import { Button } from "@/components/ui/button";
import { PenBox, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditBudget from "../_components/EditBudget";

function Expensesscreen({ params }) {
  const [Budgetinfo, setBudgetinfo] = useState([]);
  const [expensesList, setExpenseslist] = useState([]);
  const { user } = useUser();
  const route = useRouter()
  useEffect(() => {
    user && getBudgetInfo();
    getExpensesList();
  }, [user]);
  const getBudgetInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`SUM(CAST(${Expenses.amount} AS NUMERIC))`.mapWith(
          Number
        ),
        totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number), // Corrected COUNT function
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user.primaryEmailAddress.emailAddress))
      .where(eq(Budgets.id, params.id))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));
    setBudgetinfo(result[0]);
    console.log("budgets info", result);
  };
  const getExpensesList = async () => {
    const result = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .orderBy(desc(Expenses.id));
    setExpenseslist(result);
    console.log(result);
  };
  const deleteBudget = async () => {
    try {
      const deleteExpenses = await db.delete(Expenses).where(eq(Expenses.budgetId, params.id)).returning();
      
      if (deleteExpenses.length > 0) {
        const result = await db.delete(Budgets).where(eq(Budgets.id, params.id)).returning();
        
        if (result.length > 0) {
          console.log(result);
          route.push('/dashboard/budgets');
          toast('Budget deleted successfully');
        } else {
          toast.error('Failed to delete the budget.');
        }
      } else {
        toast('No expenses found to delete.');
      }
    } catch (error) {
      console.error("Error deleting budget:", error);
      toast.error('An error occurred while deleting the budget.');
    }
  };
  
  return (
    <>
    <div className="p-5">
    <h2 className="font-bold text-2xl flex justify-between items-center">
        My Expenses
        <div className="flex gap-2 items-center">
            <EditBudget Budgetinfo = {Budgetinfo} 
            refreshdata={()=>{
                getBudgetInfo();
                getExpensesList();
            }}
            />
       
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="flex gap-2" variant="destructive">
              <Trash />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your current budget along with expenses.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={deleteBudget}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        </div>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {Budgetinfo ? (
          <BudgetItem budget={Budgetinfo} />
        ) : (
          <div className="h-[150px] bg-slate-300 w-full rounded-lg animate-pulse"></div>
        )}
        <AddExpenses
          budgetId={params.id}
          refreshdata={() => {
            getBudgetInfo();
            getExpensesList();
          }}
        />
      </div>
      <div className="mt-4">
        <ExpensesListTable
          expensesList={expensesList}
          refreshData={() => {
            getExpensesList();
            getBudgetInfo();
          }}
        />
      </div>
    </div>
    </>
  );
  
}

export default Expensesscreen;
