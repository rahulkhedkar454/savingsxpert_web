'use client'
import { useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'
import { db } from '@/utils/dbConfig'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import { useState } from 'react';
import ExpensesListTable from './_components/ExpensesListTable';
function page() {
    const [budgetList,setBudgetList] = useState([])
  const [expensesList,setexpensesList] = useState([])
  const {user}= useUser();
  useEffect(()=>{
      user&&getBudgetList();
  },[user])
  const getBudgetList = async () => {
      try {
          if (!user) return; // Ensure user object is available
  
          const result = await db.select({
              ...getTableColumns(Budgets),
              totalSpend: sql`SUM(CAST(${Expenses.amount} AS NUMERIC))`.mapWith(Number),
              totalItem: sql`COUNT(${Expenses.id})`.mapWith(Number) // Corrected COUNT function
          })
          .from(Budgets)
          .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
          .where(eq(Budgets.createdBy, user.primaryEmailAddress.emailAddress))
          .groupBy(Budgets.id).orderBy(desc(Budgets.id));
          console.log('result',result)
          setBudgetList(result);
          getAllExpenses()
          
      } catch (error) {
          console.error('Error fetching budget list:', error);
      }
  };

  const getAllExpenses = async ()=>{
    try {
      if (!user) return; // Ensure user object is available
      const result = await db.select(
        {id:Expenses.id,
          name:Expenses.name,
          amount:Expenses.amount,
          createdAt:Expenses.createdAt,
        }
      )
      .from(Budgets)
      .rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Expenses.id));
      console.log('result',result)
      setexpensesList(result)
      } catch (error) {
        console.error('Error fetching expenses:', error);
        }
  }
  
  return (
    <div className='p-5 '>
     <ExpensesListTable expensesList ={expensesList}
          refreshData={()=>{
            getBudgetList();
          }}
          />
    </div>
  )
}

export default page