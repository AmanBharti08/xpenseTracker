import React, { useEffect, useState } from "react";
import Styles from "./RecentTransaction.module.css";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaPen } from "react-icons/fa";
import ModalExpense from "./Modal/ModalExpense";

const RecentTransaction = () => {
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModadlOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    setExpenses(storedExpenses);
  }, []);

  const handleDelete = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  const handleEdit = (id) => {
    const expense = expenses.find((expense) => expense.id === id);
    setIsModadlOpen(true);
    console.log(expense);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const noOfExpense = 2;
  const firstIndex = (currentPage - 1) * noOfExpense;
  const lastIndex = firstIndex + noOfExpense;
  const currentExpenses = expenses.slice(firstIndex, lastIndex);

  return (
    <div className={Styles.container}>
      <h2 style={{ margin: "0", color: "white" }}>Recent Transactions</h2>
      <ul className={Styles.ul}>
        {currentExpenses.map((expense, index) => {
          return (
            <li key={expense.id} className={Styles.listContainer}>
              <div className={Styles.listFirstHalf}>
                <div
                  style={{
                    height: "50px",
                    backgroundColor: "#626262",
                    width: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                  }}
                >
                  <MdOutlineLocalGroceryStore size={30} color="white" />
                </div>
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "400",
                      margin: "0",
                    }}
                  >
                    {expense.title}
                  </p>
                  <p
                    style={{
                      fontWeight: "200",
                      margin: "0",
                    }}
                  >
                    {expense.date}
                  </p>
                </div>
              </div>
              <div className={Styles.listSecondHalf}>
                <p style={{ color: "green", fontWeight: "700" }}>
                  ₹{expense.amount}
                </p>
                <button
                  style={{
                    backgroundColor: "red",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "none",
                    borderRadius: "10px",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(expense.id)}
                >
                  <IoIosCloseCircleOutline size={50} />
                </button>
                <button
                  style={{
                    backgroundColor: "orange",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "none",
                    borderRadius: "10px",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => handleEdit(expense.id)}
                >
                  <FaPen size={50} />
                </button>
                {isModalOpen && <ModalExpense closeModal={setIsModadlOpen} />}
              </div>
            </li>
          );
        })}
      </ul>

      <div className={Styles.buttons}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <h2>Page {currentPage}</h2>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(expenses.length / noOfExpense)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecentTransaction;
