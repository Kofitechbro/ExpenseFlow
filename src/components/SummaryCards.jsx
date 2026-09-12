function SummaryCards({ transactions }) {
  // Filter transactions based on type (income or expense)
  const incomeTransactions = transactions.filter(
    (transaction) => transaction.type === 'income',
  );

  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === 'expense',
  );

  // Calculate total income, total expenses, and total balance
  const totalIncome = incomeTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0,
  );

  const totalExpenses = expenseTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0,
  );

  const totalBalance = totalIncome - totalExpenses;

  return (
    <section className="summary-cards">
      <div className="summary-card">
        <h3>Total Balance</h3>
        <p>₵{totalBalance.toFixed(2)}</p>
      </div>

      <div className="summary-card">
        <h3>Total Income</h3>
        <p>₵{totalIncome.toFixed(2)}</p>
      </div>

      <div className="summary-card">
        <h3>Total Expenses</h3>
        <p>₵{totalExpenses.toFixed(2)}</p>
      </div>
    </section>
  );
}

export default SummaryCards;
