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

export default {
  getTransactions,
  saveTransactions,
};
