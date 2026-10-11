import SummaryCards from '../../components/SummaryCards/SummaryCards';
import TransactionList from '../../components/TransactionList/TransactionList';
import FloatingAddButton from '../../components/FloatingAddButton/FloatingAddButton';
import { useState } from 'react';
import './Dashboard.css';

function Dashboard({ transactions, onDeleteTransaction, onEditTransaction }) {
  const [visibleCount, setVisibleCount] = useState(5);

  // Show New Transactions first by sorting the transactions in descending order based on their date
  const sortedVisibleTransactions = [...transactions].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  // Get the visible transactions based on the current visible count
  const visibleTransactions = sortedVisibleTransactions.slice(0, visibleCount);

  function increaseVisibleCount() {
    setVisibleCount((currentCount) => currentCount + 5);
  }

  return (
    <main>
      <SummaryCards transactions={transactions} />

      <TransactionList
        transactions={visibleTransactions}
        onDeleteTransaction={onDeleteTransaction}
        onEditTransaction={onEditTransaction}
        showViewAll={true}
      />

      {visibleCount < transactions.length && (
        <div className="load-more">
          <button
            type="button"
            className="load-more-button"
            onClick={increaseVisibleCount}
          >
            Load 5 More
          </button>
        </div>
      )}

      {transactions.length > 0 && (
        <FloatingAddButton>Add Transaction</FloatingAddButton>
      )}
    </main>
  );
}

export default Dashboard;
