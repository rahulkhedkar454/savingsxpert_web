import React from 'react'
import BudgetsList from './_componets/BudgetsList'

function Budget() {
  return (
    <div className='pl-10 p-5'>
     <h2 className='font-bold text-3xl'>My Budgets</h2>
      <BudgetsList/>
    </div>
  )
}

export default Budget