import { PiggyBank, ReceiptText, WalletIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

function CardInfo({ budgetList }) {
  // Default value for BudgetsList
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);

  useEffect(() => {
    budgetList && calculateCardInfo();
  }, [budgetList]); // Dependency array to rerun the effect when BudgetsList changes

  const calculateCardInfo = () => {
    let total_Budget = 0;
    let total_Spend = 0;

    budgetList.forEach((budget) => {
      total_Budget = total_Budget + Number(budget.amount);
      total_Spend = total_Spend + budget.totalSpend;
      //   console.log(total_Budget,budget.amount)
    });

    setTotalBudget(total_Budget);
    setTotalSpend(total_Spend);

    console.log(total_Budget, total_Spend);
  };

  return (
    <div>
      {budgetList?.length > 0 ? (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
          <div className="p-7 border rounded-lg flex items-center justify-between shadow-md">
            <div>
              <h2 className="text-sm">Total Budget</h2>
              <h2 className="font-bold text-2xl">₹{totalBudget}</h2>
            </div>
            <PiggyBank className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-lg flex items-center justify-between shadow-md">
            <div>
              <h2 className="text-sm">Total Spend</h2>
              <h2 className="font-bold text-2xl">₹{totalSpend}</h2>
            </div>
            <ReceiptText className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-lg flex items-center justify-between shadow-md">
            <div>
              <h2 className="text-sm">No. Of Budget</h2>
              <h2 className="font-bold text-2xl">{budgetList.length}</h2>
            </div>
            <WalletIcon className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((item, index) => (
            <div
              key={index}
              className="h-[160px] w-full bg-slate-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardInfo;
