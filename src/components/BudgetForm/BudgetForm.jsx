import { useState } from "react";
import "./BudgetForm.css";

function getCurrentMonth() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
}

function BudgetForm({ onAddBudget, onUpdateBudget, editingBudget, onClose }) {
  const [formData, setFormData] = useState(() => {
    if (editingBudget) {
      return {
        name: editingBudget.name,
        amount: String(editingBudget.amount),
        month:
          editingBudget?.month ||
          editingBudget?.startDate?.slice(0, 7) ||
          getCurrentMonth(),
      };
    }

    return {
      name: "",
      amount: "",
      month: getCurrentMonth(),
    };
  });

  const [error, setError] = useState({
    name: "",
    amount: "",
    month: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));

    setError((prevErrors) => ({ ...prevErrors, [name]: "" }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (formData.name.trim() === "") {
      setError((prevError) => ({
        ...prevError,
        name: "Please enter a budget name.",
      }));
      return;
    }

    if (formData.amount.trim() === "") {
      setError((prevError) => ({
        ...prevError,
        amount: "Please enter budget amount",
      }));
      return;
    }

    const amountValue = Number(formData.amount);
    if (!Number.isFinite(amountValue) || amountValue < 0.01) {
      setError((prevError) => ({
        ...prevError,
        amount: "Please enter a valid amount of at least 0.01.",
      }));
      return;
    }

    if (formData.month === "") {
      setError((prevError) => ({
        ...prevError,
        month: "Please select a starting month",
      }));
      return;
    }

    if (formData.month < getCurrentMonth()) {
      setError((prevError) => ({
        ...prevError,
        month: "Please select the current month or a future month.",
      }));
    }

    if (editingBudget) {
      const updatedBudget = {
        ...editingBudget,
        name: formData.name.trim(),
        amount: Number(formData.amount),
        month: formData.month,
      };

      onUpdateBudget(updatedBudget);
    } else {
      const newBudget = {
        id: Date.now(),
        name: formData.name.trim(),
        amount: Number(formData.amount),
        month: formData.month,
      };
      onAddBudget(newBudget);
    }

    setFormData({
      name: "",
      amount: "",
      month: "",
    });

    setError({
      name: "",
      amount: "",
      startDate: "",
      endDate: "",
    });

    onClose();
  }

  return (
    <section className="budget-form-container">
      <div className="budget-form-heading">
        <h3>{editingBudget ? "Edit" : "Set Your Budget"}</h3>
        <button
          type="button"
          className="budget-modal-close"
          onClick={onClose}
          aria-label="Close budget form"
        >
          &times;
        </button>
      </div>

      <form className="budget-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="budget-name">Budget name:</label>
          <input
            className={error.name ? "border-error" : ""}
            type="text"
            id="budget-name"
            name="name"
            value={formData.name}
            autoComplete="off"
            onChange={handleChange}
            placeholder="e.g. Monthly Budget"
          />
          {error.name && <p className="error-text">{error.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="budget-amount">Budget amount:</label>
          <input
            type="number"
            className={error.amount ? "border-error" : ""}
            id="budget-amount"
            name="amount"
            value={formData.amount}
            autoComplete="off"
            onChange={handleChange}
            placeholder="Enter budget amount"
            min="0.01"
            step="0.01"
          />
          {error.amount && <p className="error-text">{error.amount}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="budget-month">Budget Month:</label>
          <input
            type="month"
            className={error.month ? "border-error" : ""}
            id="budget-month"
            name="month"
            value={formData.month}
            // min={getCurrentMonth()} // this prevent users from selecting a past month.
            autoComplete="off"
            onChange={handleChange}
          />
          {error.month && <p className="error-text">{error.month}</p>}
        </div>

        <button type="submit">
          {editingBudget ? "Save Changes" : "Create Budget"}
        </button>
      </form>
    </section>
  );
}

export default BudgetForm;
