import React, { useState } from "react";
import Styles from "./ModalExpense.module.css";

const ModalExpense = ({ closeModal, updateTotalAmount, updateExpenses }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const addExpense = () => {
    const newExpense = {
      id: Date.now(),
      title,
      amount: Number(amount),
      category,
      date,
    };
    const existingExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

    const updatedExpenses = [newExpense, ...existingExpenses];
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

    // Update the total expense and wallet balance
    const existingTotalAmount = Number(localStorage.getItem("totalAmount"));
    const newTotalAmount = existingTotalAmount - Number(amount);

    updateExpenses();
    updateTotalAmount(newTotalAmount);
    window.location.reload(false);
    closeModal(false);
  };

  return (
    <div className={Styles.background}>
      <div className={Styles.container}>
        <div className="title">
          <h1>Add Expenses</h1>
        </div>
        <div className={Styles.gridContainer}>
          <input
            type="text"
            placeholder="Title"
            className={Styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            className={Styles.input}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <label htmlFor="">
            <select
              name=""
              id=""
              className={Styles.input}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Groceries">Groceries</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <input
            type="date"
            placeholder=""
            className={Styles.input}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <button
            className={Styles.btn}
            style={{
              width: "250px",
              padding: "10px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "orange",
              marginRight: "10px",
            }}
            onClick={addExpense}
          >
            Add Expense
          </button>
          <button
            className={Styles.btn}
            style={{
              width: "150px",
              padding: "10px",
              borderRadius: "10px",
              border: "none",
            }}
            onClick={() => closeModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalExpense;
