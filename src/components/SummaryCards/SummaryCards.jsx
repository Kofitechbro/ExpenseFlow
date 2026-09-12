import './SummaryCards.css';
import SummaryCard from './SummaryCard';

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
      <SummaryCard title="Total Balance" amount={totalBalance} />
      <SummaryCard title="Total Income" amount={totalIncome} />
      <SummaryCard title="Total Expenses" amount={totalExpenses} />
    </section>
  );
}

export default SummaryCards;
