import { useState } from "react";
import "./BudgetForm.css";

function BudgetForm({ onAddBudget, onUpdateBudget, editingBudget, onClose }) {
  const [formData, setFormData] = useState(() => {
    if (editingBudget) {
      return {
        name: editingBudget.name,
        amount: String(editingBudget.amount),
        startDate: editingBudget.startDate,
        endDate: editingBudget.endDate,
      };
    }

    return {
      name: "",
      amount: "",
      startDate: "",
      endDate: "",
    };
  });

  const [error, setError] = useState({
    name: "",
    amount: "",
    startDate: "",
    endDate: "",
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
        amount: "Please enter an amount of at least 0.01",
      }));
      return;
    }

    if (formData.startDate.trim() === "") {
      setError((prevError) => ({
        ...prevError,
        startDate: "Please select a starting date",
      }));
      return;
    }

    if (formData.endDate.trim() === "") {
      setError((prevError) => ({
        ...prevError,
        endDate: "Please select an end date",
      }));
      return;
    }

    if (formData.endDate < formData.startDate) {
      setError((prevError) => ({
        ...prevError,
        endDate: "End date cannot be before the start date.",
      }));
      return;
    }

    if (editingBudget) {
      const updatedBudget = {
        ...editingBudget,
        name: formData.name.trim(),
        amount: Number(formData.amount),
        startDate: formData.startDate,
        endDate: formData.endDate,
      };

      onUpdateBudget(updatedBudget);
    } else {
      const newBudget = {
        id: Date.now(),
        name: formData.name.trim(),
        amount: Number(formData.amount),
        startDate: formData.startDate,
        endDate: formData.endDate,
      };
      onAddBudget(newBudget);
    }

    setFormData({
      name: "",
      amount: "",
      startDate: "",
      endDate: "",
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
          aria-label="Close budget form">
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
          <label htmlFor="budget-start-date">Start Date:</label>
          <input
            type="date"
            className={error.startDate ? "border-error" : ""}
            id="budget-start-date"
            name="startDate"
            value={formData.startDate}
            autoComplete="off"
            onChange={handleChange}
          />
          {error.startDate && <p className="error-text">{error.startDate}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="budget-end-date">End Date:</label>
          <input
            type="date"
            className={error.endDate ? "border-error" : ""}
            id="budget-end-date"
            name="endDate"
            value={formData.endDate}
            autoComplete="off"
            onChange={handleChange}
            min={formData.startDate || undefined}
          />
          {error.endDate && <p className="error-text">{error.endDate}</p>}
        </div>
        <button type="submit">
          {editingBudget ? "Save Changes" : "Create Budget"}
        </button>
      </form>
    </section>
  );
}

export default BudgetForm;
