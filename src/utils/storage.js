// Retrieves the list of transactions from local storage
function getTransactions() {
  const storedTransactions = localStorage.getItem('transactions');

  if (!storedTransactions) {
    return null;
  }

  return JSON.parse(storedTransactions);
}

// Saves the list of transactions to local storage
function saveTransactions(transactions) {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Retrieves the list of budgets from local storage
function getBudgets() {
  const storedBudgets = localStorage.getItem('budgets');

  if (!storedBudgets) {
    return null;
  }

  return JSON.parse(storedBudgets);
}

// Saves the list of budget to local storage
function saveBudgets(budgets) {
  localStorage.setItem('budgets', JSON.stringify(budgets));
}

export default {
  getTransactions,
  saveTransactions,
  getBudgets,
  saveBudgets,
};
