import { useState } from 'react';
import './BudgetForm.css';

function BudgetForm({ onAddBudget }) {
  const [formData, setFormData] = useState({
    budgetName: '',
    amount: '',
    startDate: '',
    endDate: '',
  });

  const [error, setError] = useState({
    budgetName: '',
    amount: '',
    startDate: '',
    endDate: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));

    setError((prevErrors) => ({ ...prevErrors, [name]: '' }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (formData.budgetName.trim() === '') {
      setError((prevError) => ({
        ...prevError,
        budgetName: 'Please enter a budget name.',
      }));
      return;
    }

    if (formData.amount.trim() === '') {
      setError((prevError) => ({
        ...prevError,
        amount: 'Please enter budget amount',
      }));
      return;
    }

    const amountValue = Number(formData.amount);
    if (!Number.isFinite(amountValue) || amountValue < 0.01) {
      setError((prevError) => ({
        ...prevError,
        amount: 'Please enter an amount of at least 0.01',
      }));
      return;
    }

    if (formData.startDate.trim() === '') {
      setError((prevError) => ({
        ...prevError,
        startDate: 'Please select a starting date',
      }));
      return;
    }

    if (formData.endDate.trim() === '') {
      setError((prevError) => ({
        ...prevError,
        endDate: 'Please select an end date',
      }));
      return;
    }

    if (formData.endDate < formData.startDate) {
      setError((prevError) => ({
        ...prevError,
        endDate: 'End date cannot be before the start date.',
      }));
      return;
    }

    const newBudget = {
      id: Date.now(),
      name: formData.budgetName,
      amount: Number(formData.amount),
      startDate: formData.startDate,
      endDate: formData.endDate,
    };
    onAddBudget(newBudget);

    setFormData({
      budgetName: '',
      amount: '',
      startDate: '',
      endDate: '',
    });

    setError({
      budgetName: '',
      amount: '',
      startDate: '',
      endDate: '',
    });
  }

  return (
    <section className="budget-form-container">
      <h2>Set Your Budget</h2>

      <form className="budget-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="budget-name">Budget name:</label>
          <input
            className={error.budgetName ? 'border-error' : ''}
            type="text"
            id="budget-name"
            name="budgetName"
            value={formData.budgetName}
            onChange={handleChange}
            placeholder="e.g. Monthly Budget"
            // required
          />
          {error.budgetName && <p className="error-text">{error.budgetName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="budget-amount">Budget amount:</label>
          <input
            type="number"
            className={error.amount ? 'border-error' : ''}
            id="budget-amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter budget amount"
            min="0.01"
            step="0.01"
            // required
          />
          {error.amount && <p className="error-text">{error.amount}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="budget-start-date">Start Date:</label>
          <input
            type="date"
            className={error.startDate ? 'border-error' : ''}
            id="budget-start-date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            // required
          />
          {error.startDate && <p className="error-text">{error.startDate}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="budget-end-date">End Date:</label>
          <input
            type="date"
            className={error.endDate ? 'border-error' : ''}
            id="budget-end-date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            // required
          />
          {error.endDate && <p className="error-text">{error.endDate}</p>}
        </div>
        <button type="submit">Create Budget</button>
      </form>
    </section>
  );
}

export default BudgetForm;
