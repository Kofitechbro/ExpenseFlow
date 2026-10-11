import './Budget.css';
import BudgetForm from '../../components/BudgetForm/BudgetForm';
import { useState } from 'react';

function Budget({ budgets, onAddBudget }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="budget-page">
      {/* Page heading */}
      <section className="budget-heading">
        <h1>Budget Overview</h1>
        <p>
          Plan your spending, monitor your progress, and stay within your
          budget.
        </p>
      </section>

      {/* Budget overview */}
      <section className="budget-overview">
        <h2>Monthly Summary</h2>
        <p>
          Your spending summary will appear here when your budget is set up.
        </p>
      </section>
      {/* Empty state */}

      {budgets.length === 0 && (
        <section className="budget-empty-state">
          <div className="budget-empty-icon" aria-label="Budget Icon">
            <i className="fa-solid fa-cedi-sign"></i>
          </div>
          <h2>Set Your Budget</h2>
          <p>
            Create a budget to set your spending limit and track how much you
            spend during the selected period.
          </p>

          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
            }}
            className="budget-state-button"
          >
            Add Budget
          </button>
        </section>
      )}

      {isOpen && (
        <section
          className="budget-modal-backdrop"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="budget-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <BudgetForm
              onAddBudget={onAddBudget}
              onClose={() => setIsOpen(false)}
            />
          </div>
        </section>
      )}
    </main>
  );
}

export default Budget;
