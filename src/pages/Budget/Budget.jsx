import { FaChartLine, FaEllipsisV, FaMoneyBillWave, FaPen, FaReceipt, FaTimes, FaTrashAlt, FaWallet } from 'react-icons/fa';

import "./Budget.css";
import BudgetForm from "../../components/BudgetForm/BudgetForm";
import { useState } from "react";

function getCurrentMonth() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
}

function getBudgetMonth(budget) {
  return budget.month || getCurrentMonth();
}

function Budget({
  budgets,
  onAddBudget,
  onDeleteBudget,
  transactions,
  onUpdateBudget,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [openBudgetMenuId, setOpenBudgetMenuId] = useState(null);
  const [editingBudget, setEditingBudget] = useState(null);

  function openModal() {
    setEditingBudget(null);
    setOpenBudgetMenuId(null);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function formatDate(dateFormat) {
    const [year, month] = dateFormat.split("-").map(Number);

    const formattedDate = new Date(year, month - 1).toLocaleDateString(
      "en-GB",
      {
        // day: "2-digit",
        month: "long",
        year: "numeric",
      },
    );
    return formattedDate;
  }

  function formatCurrency(currency) {
    const amount = currency;

    const formattedAmount = amount.toLocaleString("en-GH", {
      style: "currency",
      currency: "GHS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formattedAmount;
  }

  function totalExpenses(budget) {
    const budgetMonth = getBudgetMonth(budget);

    const expenses = transactions.filter((transaction) => {
      return (
        transaction.type === "Expense" &&
        typeof transaction.date === "string" &&
        transaction.date.slice(0, 7) === budgetMonth &&
        transaction.category === budget.category
      );
    });

    return expenses.reduce((total, transaction) => {
      return total + Number(transaction.amount);
    }, 0);
  }

  function getCurrentMonthExpenses() {
    const today = new Date();

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    const monthlyExpenses = transactions.filter((transaction) => {
      const transactionDate = new Date(`${transaction.date}T00:00:00`);

      return (
        transaction.type === "Expense" &&
        transactionDate.getFullYear() === currentYear &&
        transactionDate.getMonth() === currentMonth
      );
    });

    return monthlyExpenses.reduce((total, transaction) => {
      return total + Number(transaction.amount);
    }, 0);
  }

  function getCurrentMonthExpenseCount() {
    const today = new Date();

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    const monthlyExpenses = transactions.filter((transaction) => {
      const transactionDate = new Date(`${transaction.date}T00:00:00`);

      return (
        transaction.type === "Expense" &&
        transactionDate.getFullYear() === currentYear &&
        transactionDate.getMonth() === currentMonth
      );
    });

    return monthlyExpenses.length;
  }

  function getCurrentMonthAverageExpense() {
    const total = getCurrentMonthExpenses();
    const count = getCurrentMonthExpenseCount();

    if (count === 0) {
      return 0;
    }

    return total / count;
  }

  const currentMonthSpent = getCurrentMonthExpenses();
  const currentMonthExpenseCount = getCurrentMonthExpenseCount();
  const averageExpense = getCurrentMonthAverageExpense();

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
        <div className="budget-overview-heading">
          <div>
            <h2>Monthly Summary</h2>
            <p>Your spending at a glance this month.</p>
          </div>
        </div>

        <div className="budget-summary-grid">
          <article className="budget-summary-card">
            <div className="budget-summary-icon expense-icon">
              <FaMoneyBillWave aria-hidden="true" />
            </div>

            <p className="budget-summary-label">Monthly Expenses</p>
            <h3>{formatCurrency(currentMonthSpent)}</h3>

            <p className="budget-summary-description">Total amount spent</p>
          </article>

          <article className="budget-summary-card">
            <div className="budget-summary-icon transactions-icon">
              <FaReceipt aria-hidden="true" />
            </div>

            <p className="budget-summary-label">Transactions</p>
            <h3>{currentMonthExpenseCount}</h3>

            <p className="budget-summary-description">
              Expense transactions this month
            </p>
          </article>

          <article className="budget-summary-card">
            <div className="budget-summary-icon average-icon">
              <FaChartLine aria-hidden="true" />
            </div>

            <p className="budget-summary-label">Average Expense</p>
            <h3>{formatCurrency(averageExpense)}</h3>

            <p className="budget-summary-description">
              Average per expense transaction
            </p>
          </article>
        </div>
      </section>

      {/* Empty state */}
      {budgets.length === 0 ? (
        <section className="budget-empty-state">
          <div className="budget-empty-icon" aria-label="Budget Icon">
            <FaWallet aria-hidden="true" />
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
            {budgets.map((budget) => {
              // Calculate spending once for this budget.
              const spent = totalExpenses(budget);

              // Calculate how much of the budget remains.
              const remaining = budget.amount - spent;

              // Calculate the percentage of the budget used.
              const percentageUsed =
                budget.amount > 0 ? (spent / budget.amount) * 100 : 0;

              // Prevent the progress bar from exceeding 100%
              const progressWidth = Math.min(Math.max(percentageUsed, 0), 100);

              return (
                <article key={budget.id} className="budget-card">
                  <div className="budget-card-details">
                    <div>
                      <h3>{budget.name}</h3>
                      <p className="budget-category">{budget.category}</p>
                      <p>{formatDate(getBudgetMonth(budget))}</p>
                    </div>

                    <div className="budget-action">
                      <button
                        className="budget-actions-button"
                        type="button"
                        onClick={() => {
                          setOpenBudgetMenuId((currentId) =>
                            currentId === budget.id ? null : budget.id,
                          );
                        }}
                        aria-label={`Actions for ${budget.name}`}
                        aria-expanded={openBudgetMenuId === budget.id}
                      >
                        {openBudgetMenuId === budget.id ? (
                          <FaTimes aria-hidden="true" />
                        ) : (
                          <FaEllipsisV aria-hidden="true" />
                        )}
                      </button>

                      {openBudgetMenuId === budget.id && (
                        <div className="budget-action-menu">
                          <button
                            className="budget-action-edit"
                            onClick={() => {
                              setEditingBudget(budget);
                              setIsOpen(true);
                              setOpenBudgetMenuId(null);
                            }}
                            type="button"
                          >
                            <FaPen aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            className="budget-action-delete"
                            onClick={() => {
                              const confirmed = window.confirm(
                                `Are you sure you want to delete the "${budget.name}" budget?`,
                              );

                              if (confirmed) {
                                onDeleteBudget(budget.id);
                                setOpenBudgetMenuId(null);
                              }
                            }}
                            aria-label={`Delete ${budget.name} budget`}
                          >
                            <FaTrashAlt aria-hidden="true" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="budget-card-limit">
                    <span>Spending limit</span>
                    <p>{formatCurrency(budget.amount)}</p>
                  </div>

                  <div className="budget-card-progress">
                    <div className="budget-card-progress-details">
                      <span>Amount Spent: {formatCurrency(spent)}</span>

                      <span>
                        {remaining >= 0
                          ? `Remaining: ${formatCurrency(remaining)}`
                          : `Over Budget by ${formatCurrency(Math.abs(remaining))}`}
                      </span>
                    </div>

                    <div
                      className="budget-progress-track"
                      role="progressbar"
                      aria-label={`Budget used for ${budget.name}`}
                      aria-valuenow={progressWidth}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="budget-progress-fill"
                        style={{ width: `${progressWidth}%` }}
                      ></div>
                    </div>
                    <p className="budget-card-percentage">
                      {percentageUsed.toFixed(1)}% used
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {isOpen && (
        <section className="budget-modal-backdrop" onClick={closeModal}>
          <div
            className="budget-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <BudgetForm
              key={editingBudget?.id ?? "No-Budget"}
              budgets={budgets}
              onAddBudget={onAddBudget}
              onUpdateBudget={onUpdateBudget}
              editingBudget={editingBudget}
              onClose={closeModal}
            />
          </div>
        </section>
      )}

      {budgets.length > 0 && (
        <div className="budget-float-button">
          <button type="button" onClick={openModal}>
            Add Budget
          </button>
        </div>
      )}
    </main>
  );
}

export default Budget;
