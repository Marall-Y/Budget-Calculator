import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert";

import "./App.css";

const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

const App = () => {
  /************************ STATES */
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({ show: false, type: "", text: "" });
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState(0);

  /************************** FUNCTIONS */

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const chargeHandler = (e) => {
    setCharge(e.target.value);
  };
  const amountHandler = (e) => {
    let amount = e.target.value;
    if (amount === "") {
      setAmount(amount);
    } else {
      setAmount(parseInt(amount));
    }
  };
  const alertHandler = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (editMode) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEditMode(false);
        alertHandler({ type: "success", text: "Item edited succesfully." });
      } else {
        const newExpense = { id: uuid(), charge, amount };
        setExpenses([...expenses, newExpense]);

        alertHandler({ type: "success", text: "Item is successfully added." });
      }

      setCharge("");
      setAmount("");
    } else {
      alertHandler({
        type: "danger",
        text: "Charge and Amount inputs should be filled.",
      });
    }
  };

  const clearListHandler = () => {
    setExpenses([]);
    alertHandler({ type: "danger", text: "All Items deleted." });
  };
  const deleteHandler = (id) => {
    let afterDeleteItems = expenses.filter((item) => item.id !== id);
    setExpenses(afterDeleteItems);
    alertHandler({ type: "danger", text: "Item is sucessfully deleted." });
  };
  const editHandler = (id) => {
    let selectedItem = expenses.find((item) => item.id === id);
    let { charge, amount } = selectedItem;
    setCharge(charge);
    setAmount(amount);
    setEditMode(true);
    setId(id);
  };
  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          chargeHandler={chargeHandler}
          amountHandler={amountHandler}
          submitHandler={submitHandler}
          editMode={editMode}
        />
        <ExpenseList
          expenses={expenses}
          clearList={clearListHandler}
          deleteHandler={deleteHandler}
          editHandler={editHandler}
        />
      </main>
      <h1>
        total spending :
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return (acc += curr.amount);
          }, 0)}
        </span>
      </h1>
    </>
  );
};

export default App;
