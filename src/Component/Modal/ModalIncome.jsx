import React, { useState } from "react";
import Styles from "./ModalExpense.module.css";

const ModalIncome = ({ closeModal, updateTotalAmount }) => {
  const [amount, setAmount] = useState("");

  const addIncome = () => {
    const existingIncome = Number(localStorage.getItem("totalAmount")) || 5000;
    const newIncome = existingIncome + Number(amount);
    localStorage.setItem("totalAmount", newIncome);
    updateTotalAmount(newIncome);
    closeModal(false);
  };

  return (
    <div className={Styles.background}>
      <div className={Styles.container}>
        <div className="title">
          <h1>Add Income</h1>
        </div>
        <div className={Styles.gridContainer}>
          <input
            type="number"
            placeholder="Amount"
            className={Styles.input}
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
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
              onClick={addIncome}
            >
              Add Income
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
    </div>
  );
};

export default ModalIncome;
