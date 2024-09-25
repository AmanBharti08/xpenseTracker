import React, { useEffect, useState } from "react";
import Styles from "./ExpenseTracker.module.css";
import PieChart from "./Piechart/Piechart.jsx";
import ModalIncome from "../Modal/ModalIncome.jsx";
import ModalExpense from "../Modal/ModalExpense.jsx";

const ExpenseTracker = () => {
  const [totalAmount, setTotalAmount] = useState(5000);
  const [expense, setExpense] = useState(0);

  const [openExpense, setOpenExpense] = useState(false);
  const [openIncome, setOpenIncome] = useState(false);

  useEffect(() => {
    const storedTotalAmount =
      Number(localStorage.getItem("totalAmount")) || 5000;
    const existingExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const totalExpense = existingExpenses.reduce(
      (acc, expense) => acc + Number(expense.amount),
      0
    );
    setExpense(totalExpense);
    setTotalAmount(storedTotalAmount);

    const handleExpenseUpdated = () => {
      updateExpenses();
      
    };

    window.addEventListener("expenseUpdated", handleExpenseUpdated);

    return () => {
      window.removeEventListener("expenseUpdated", handleExpenseUpdated);
    };
  }, []);

  const updateTotalAmount = (newAmount) => {
    setTotalAmount(newAmount);
    localStorage.setItem("totalAmount", newAmount);
  };

  const updateExpenses = () => {
    const existingExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const totalExpense = existingExpenses.reduce(
      (acc, expense) => acc + Number(expense.amount),
      0
    );
    setExpense(totalExpense);
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.walletBalance}>
        <h2>
          Wallet Balance:{" "}
          <span style={{ color: "rgb(0, 128, 0,0.8)" }}>${totalAmount}</span>
        </h2>
        <button onClick={() => setOpenIncome(true)}>+ Add Income</button>
      </div>
      {openIncome && (
        <ModalIncome
          closeModal={setOpenIncome}
          updateTotalAmount={updateTotalAmount}
        />
      )}

      <div className={Styles.expense}>
        <h2>
          Expenses:{" "}
          <span style={{ color: "rgba(255, 0, 0, 0.642)" }}>${expense}</span>
        </h2>
        <button onClick={() => setOpenExpense(true)}>+ Add Expense</button>
      </div>
      {openExpense && (
        <ModalExpense
          closeModal={setOpenExpense}
          updateTotalAmount={updateTotalAmount}
          updateExpenses={updateExpenses}
          totalAmount={totalAmount}
        />
      )}

      <div className={Styles.pieChart}>
        <PieChart />
      </div>
    </div>
  );
};

export default ExpenseTracker;
