import { useState } from 'react';
import './TransactionForm.css';

// TransactionForm component handles the form for adding and editing transactions
function TransactionForm({
  onAddTransaction,
  editingTransaction,
  onUpdateTransaction,
  onCancelEdit,
}) {
  return (
    // Render the TransactionFormContent component and pass down the necessary props
    <TransactionFormContent
      key={editingTransaction ? editingTransaction.id : 'new'}
      onAddTransaction={onAddTransaction}
      editingTransaction={editingTransaction}
      onUpdateTransaction={onUpdateTransaction}
      onCancelEdit={onCancelEdit}
    />
  );
}

// TransactionFormContent component manages the form state and handles form submission  
function TransactionFormContent({
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

  const [formData, setFormData] = useState(() => {
    if (editingTransaction) {
      return {
        type: editingTransaction.type,
        description: editingTransaction.description,
        amount: String(editingTransaction.amount),
        category: editingTransaction.category,
        date: editingTransaction.date,
        paymentMethod: editingTransaction.paymentMethod,
      };
    }

    return {
      type: '',
      description: '',
      amount: '',
      category: '',
      date: '',
      paymentMethod: '',
    };
  });

  function handleTypeChange(type) {
    setFormData((prevData) => ({
      ...prevData,
      type,
    }));

    setError((prevError) => ({
      ...prevError,
      type: '',
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setError((prevError) => ({
      ...prevError,
      [name]: '',
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (formData.type.trim() === '') {
      setError((prevError) => ({
        ...prevError,
        type: 'Please select a type',
      }));
      return;
    }

    if (formData.description.trim() === '') {
      setError((prevError) => ({
        ...prevError,
        description: 'Please enter a description',
      }));
      return;
    }

    if (formData.amount.trim() === '') {
      setError((prevError) => ({
        ...prevError,
        amount: 'Please enter an amount',
      }));
      return;
    }

    const amountValue = Number(formData.amount);
    if (!Number.isFinite(amountValue) || amountValue <= 0) {
      setError((prevError) => ({
        ...prevError,
        amount: 'Please enter a valid amount greater than 0',
      }));
      return;
    }

    if (formData.category.trim() === '') {
      setError((prevError) => ({
        ...prevError,
        category: 'Please select a category',
      }));
      return;
    }

    if (formData.date.trim() === '') {
      setError((prevError) => ({
        ...prevError,
        date: 'Please select a date',
      }));
      return;
    }

    if (formData.paymentMethod.trim() === '') {
      setError((prevError) => ({
        ...prevError,
        paymentMethod: 'Please select a payment method',
      }));
      return;
    }

    if (editingTransaction) {
      const updatedTransaction = {
        ...formData,
        id: editingTransaction.id,
        amount: Number(formData.amount),
      };
      onUpdateTransaction(updatedTransaction);
    } else {
      // Create a new transaction object with a unique ID and the form data
      const newTransaction = {
        ...formData,
        id: Date.now(),
        amount: Number(formData.amount),
      };
      onAddTransaction(newTransaction);
    }

    // Reset form data and errors after submission
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
        {editingTransaction && (
          <button type="button" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TransactionForm;