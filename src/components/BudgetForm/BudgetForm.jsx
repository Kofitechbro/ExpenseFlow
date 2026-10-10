import './BudgetForm.css';

function BudgetForm() {
  
  return (
    <section className="budget-form-container">
      <h2>Set Your Budget</h2>
      <form className="budget-form">
        <div className="form-group">
          <label htmlFor="budget-name">Budget name:</label>
          <input
            type="text"
            id="budget-name"
            name="budget-name"
            placeholder="e.g. Monthly Budget"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="budget-amount">Budget amount:</label>
          <input
            type="number"
            id="budget-amount"
            name="budget-amount"
            placeholder="Enter budget amount"
            min="0.01"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="budget-start-date">Start Date:</label>
          <input
            type="date"
            id="budget-start-date"
            name="budget-start-date"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="budget-end-date">End Date:</label>
          <input
            type="date"
            id="budget-end-date"
            name="budget-end-date"
            required
          />
        </div>
        <button type="submit">Create Budget</button>
      </form>
    </section>
  );
}

export default BudgetForm;