import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function BudgetBarChart({ budgetList }) {
  // Ensure budgetList is always an array
  const processedData = (budgetList || []).map(item => ({
    name: item.name || 'Unknown',
    totalSpend: item.totalSpend || 0,
    amount: item.amount || 0,
  }));

  return (
    <div className='border rounded-lg p-5 shadow-md'>
      <h2 className='font-bold text-lg mb-4'>Activity</h2>
      <ResponsiveContainer width='80%' height={300}>
        <BarChart 
          data={processedData}
          margin={{ top: 7 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSpend" stackId='a' fill="#4845d2" />
          <Bar dataKey="amount" stackId='a' fill="#C3C2FF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BudgetBarChart;
