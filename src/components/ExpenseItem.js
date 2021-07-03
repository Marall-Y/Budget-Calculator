import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

const ExpenseItem = ({ expense, deleteHandler, editHandler }) => {
  const { id, charge, amount } = expense;
  return (
    <li className="item">
      <div className="info">
        <span className="expense">{charge}</span>
        <span className="amount">${amount}</span>
      </div>
      <div>
        <button
          className="edit-btn"
          aria-label="edit button"
          onClick={() => editHandler(id)}
        >
          <MdEdit />
        </button>
        <button
          className="clear-btn"
          aria-label="delete button"
          onClick={() => deleteHandler(id)}
        >
          <MdDelete />
        </button>
      </div>
    </li>
  );
};

export default ExpenseItem;
