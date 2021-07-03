import React from "react";
import { MdDelete } from "react-icons/md";

import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ expenses, clearList, deleteHandler, editHandler }) => {
  return (
    <>
      <ul className="list">
        {expenses.map((expense) => {
          return (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
            />
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <button onClick={clearList} className="btn">
          Clear List
          <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
};

export default ExpenseList;
