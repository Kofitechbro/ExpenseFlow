import './Budget.css';
import BudgetForm from '../../components/BudgetForm/BudgetForm';
import { useState } from 'react';
import FloatingAddButton from '../../components/FloatingAddButton/FloatingAddButton';

function Budget({ budgets, onAddBudget }) {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function formatDate(dateFormat) {
    /*
    const date = new Date(dateFormat);
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    */

    const [year, month, day] = dateFormat.split('-').map(Number);
    const formattedDate = new Date(year, month - 1, day).toLocaleDateString(
      'en-GB',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      },
    );
    return formattedDate;
  }

  function formatCurrency(currency) {
    const amount = currency;
    const formattedAmount = amount.toLocaleString('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formattedAmount;
  }

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
          Spending totals will appear here once spending tracking is
          implemented.
        </p>
      </section>

      {/* Empty state */}
      {budgets.length === 0 ? (
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
            className="budget-state-button"
            onClick={openModal}
          >
            Add Budget
          </button>
        </section>
      ) : (
        <section className="budget-list">
          <h2>Your Budgets</h2>

          <div className="budget-list-grid">
            {budgets.map((budget) => (
              <article key={budget.id} className="budget-card">
                <div className="budget-card-details">
                  <h3>{budget.name}</h3>
                  <p>
                    {formatDate(budget.startDate)} -{' '}
                    {formatDate(budget.endDate)}
                  </p>
                </div>

                <div className="budget-card-limit">
                  <span>Spending limit</span>
                  <p>{formatCurrency(budget.amount)}</p>
                </div>

                <p className="budget-card-note">
                  Spending progress will be added in a later task.
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {isOpen && (
        <section className="budget-modal-backdrop" onClick={closeModal}>
          <div
            className="budget-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <BudgetForm onAddBudget={onAddBudget} onClose={closeModal} />
          </div>
        </section>
      )}

      {budgets > 0 && (
        <FloatingAddButton type="button" onClick={openModal}>
          Add Budget
        </FloatingAddButton>
      )}
    </main>
  );
}

export default Budget;
