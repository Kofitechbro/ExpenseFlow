import { useState, useEffect } from 'react';
import './TransactionForm.css';

function TransactionForm({
  onAddTransaction,
  editingTransaction,
  onUpdateTransaction,
  onCancelEdit,
}) {
  const [error, setError] = useState({
    type: '',
    description: '',
    amount: '',
    category: '',
    date: '',
    paymentMethod: '',
  });

  const [formData, setFormData] = useState({
    type: '',
    description: '',
    amount: '',
    category: '',
    date: '',
    paymentMethod: '',
  });

  useEffect(() => {
    if (editingTransaction !== null) {
      setFormData({
        type: editingTransaction.type,
        description: editingTransaction.description,
        amount: String(editingTransaction.amount),
        category: editingTransaction.category,
        date: editingTransaction.date,
        paymentMethod: editingTransaction.paymentMethod,
      });
    } else {
      setFormData({
        type: '',
        description: '',
        amount: '',
        category: '',
        date: '',
        paymentMethod: '',
      });
    }
  }, [editingTransaction]);

  function handleTypeChange(type) {
    setFormData({
      ...formData,
      type,
    });

    setError({
      ...error,
      type: '',
    });
  }

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

    setError({
      ...error,
      [event.target.name]: '',
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (formData.type.trim() === '') {
      setError({
        ...error,
        type: 'Please select a transaction type.',
      });
      return;
    }

    if (formData.description.trim() === '') {
      setError({
        ...error,
        description: 'Please enter a description.',
      });
      return;
    }

    if (formData.amount.trim() === '') {
      setError({
        ...error,
        amount: 'Please enter an amount.',
      });
      return;
    }

    if (formData.category.trim() === '') {
      setError({
        ...error,
        category: 'Please select a category.',
      });
      return;
    }

    if (formData.date.trim() === '') {
      setError({
        ...error,
        date: 'Please select a date.',
      });
      return;
    }

    if (formData.paymentMethod.trim() === '') {
      setError({
        ...error,
        paymentMethod: 'Please select a payment method.',
      });
      return;
    }

    if (editingTransaction !== null) {
      const updatedTransaction = {
        ...formData,
        id: editingTransaction.id,
        amount: Number(formData.amount),
      };

      onUpdateTransaction(updatedTransaction);
    } else {
      const newTransaction = {
        ...formData,
        id: Date.now(),
        amount: Number(formData.amount),
      };

      onAddTransaction(newTransaction);
    }

    setFormData({
      type: '',
      description: '',
      amount: '',
      category: '',
      date: '',
      paymentMethod: '',
    });

    setError({
      type: '',
      description: '',
      amount: '',
      category: '',
      date: '',
      paymentMethod: '',
    });
  }

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h2>{editingTransaction ? 'Edit Transaction' : 'Add Transaction'}</h2>
      <div className="toggle-type">
        <label htmlFor="type">Type</label>
        <div
          className={`toggle-type-button ${error.type ? 'border-error' : ''}`}
        >
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
        {error.type && <p className="error-text">{error.type}</p>}
      </div>

      <div className="description">
        <label htmlFor="description">Description</label>
        <textarea
          value={formData.description}
          onChange={handleChange}
          id="description"
          name="description"
          rows={2}
          className={`${error.description ? 'border-error' : ''}`}
        ></textarea>
        {error.description && <p className="error-text">{error.description}</p>}
      </div>

      <div className="amount">
        <label htmlFor="amount">Amount</label>
        <input
          value={formData.amount}
          onChange={handleChange}
          type="number"
          id="amount"
          name="amount"
          className={`${error.amount ? 'border-error' : ''}`}
        />
        {error.amount && <p className="error-text">{error.amount}</p>}
      </div>

      <div className="category">
        <label htmlFor="category">Category</label>
        <select
          value={formData.category}
          onChange={handleChange}
          id="category"
          name="category"
          className={`${error.category ? 'border-error' : ''}`}
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
        {error.category && <p className="error-text">{error.category}</p>}
      </div>

      <div className="date">
        <label htmlFor="date">Date</label>
        <input
          value={formData.date}
          onChange={handleChange}
          type="date"
          id="date"
          name="date"
          className={`${error.date ? 'border-error' : ''}`}
        />
        {error.date && <p className="error-text">{error.date}</p>}
      </div>

      <fieldset
        className={`paymentMethod ${error.paymentMethod ? 'border-error' : ''}`}
      >
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
        {error.paymentMethod && (
          <p className="error-text">{error.paymentMethod}</p>
        )}
      </fieldset>

      <div className="transaction-form-actions">
        <button type="submit">
          {editingTransaction ? 'Save Changes' : 'Add Transaction'}
        </button>
        {editingTransaction !== null && (
          <button type="button" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TransactionForm;
