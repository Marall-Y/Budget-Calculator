import React from "react";
import { MdSend } from "react-icons/md";

const ExpenseForm = ({
  charge,
  amount,
  chargeHandler,
  amountHandler,
  submitHandler,
  editMode,
}) => {
  return (
    <form onSubmit={submitHandler}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">Charge</label>
          <input
            value={charge}
            onChange={chargeHandler}
            type="text"
            className="form-control"
            id="charge"
            placeholder="e.g. rent"
            name="charge"
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            value={amount}
            onChange={amountHandler}
            type="number"
            className="form-control"
            id="amount"
            placeholder="e.g. 100"
            name="amount"
          />
        </div>
      </div>

      <button type="submit" className="btn">
        {editMode ? "Edit" : "Submit"}
        <MdSend className="btn-icon" />
      </button>
    </form>
  );
};

export default ExpenseForm;
