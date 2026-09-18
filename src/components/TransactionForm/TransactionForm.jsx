import { useState } from 'react';
import './TransactionForm.css';

function TransactionForm({ onAddTransaction }) {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    amount: '',
    category: '',
    date: '',
    paymentMethod: '',
  });

  function handleTypeChange(type) {
    setFormData({
      ...formData,
      type,
    });
  }

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newTransaction = {
      ...formData,
      id: Date.now(),
      amount: Number(formData.amount),
    };

    onAddTransaction(newTransaction);
  }

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>
      <div className="toggle-type">
        <label htmlFor="type">Type</label>
        <div className="toggle-type-button">
          <button
            type="button"
            onClick={() => handleTypeChange('Expense')}
            className={formData.type === 'Expense' ? 'active-expense' : ''}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange('Income')}
            className={formData.type === 'Income' ? 'active-income' : ''}
          >
            Income
          </button>
        </div>
      </div>

      <div className="description">
        <label htmlFor="description">Description</label>
        <textarea
          value={formData.description}
          onChange={handleChange}
          id="description"
          name="description"
          rows={3}
        ></textarea>
      </div>

      <div className="amount">
        <label htmlFor="amount">Amount</label>
        <input
          value={formData.amount}
          onChange={handleChange}
          type="number"
          id="amount"
          name="amount"
        />
      </div>

      <div className="category">
        <label htmlFor="category">Category</label>
        <select
          value={formData.category}
          onChange={handleChange}
          id="category"
          name="category"
        >
          <option value="" disabled>
            Select a Category
          </option>
          <option value="Health">Health</option>
          <option value="Food & Drinks">Food & Drinks</option>
          <option value="Transportation">Transportation</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills & Utilities">Bills & Utilities</option>
          <option value="Salary">Salary</option>
          <option value="Freelance">Freelance</option>
          <option value="Gift">Gift</option>
        </select>
      </div>

      <div className="date">
        <label htmlFor="date">Date</label>
        <input
          value={formData.date}
          onChange={handleChange}
          type="date"
          id="date"
          name="date"
        />
      </div>

      <fieldset className="paymentMethod">
        <legend>Payment Method</legend>

        <div className="payment-option">
          <label>
            <input
              onChange={handleChange}
              checked={formData.paymentMethod === 'Mobile Money'}
              type="radio"
              name="paymentMethod"
              value="Mobile Money"
            />
            Mobile Money
          </label>

          <label>
            <input
              onChange={handleChange}
              checked={formData.paymentMethod === 'Bank Transfer'}
              type="radio"
              name="paymentMethod"
              value="Bank Transfer"
            />
            Bank Transfer
          </label>

          <label>
            <input
              onChange={handleChange}
              checked={formData.paymentMethod === 'Cash'}
              type="radio"
              name="paymentMethod"
              value="Cash"
            />
            Cash
          </label>
        </div>
      </fieldset>

      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;
