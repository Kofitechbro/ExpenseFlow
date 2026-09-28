import SummaryCards from '../../components/SummaryCards/SummaryCards';
import TransactionList from '../../components/TransactionList/TransactionList';
import FloatingAddButton from '../../components/FloatingAddButton/FloatingAddButton';
import { useState } from 'react';
import './Dashboard.css'

function Dashboard({ transactions, onDeleteTransaction, onEditTransaction }) {
  const [visibleCount, setVisibleCount] = useState(5);

  const visibleTransactions = transactions.slice(0, visibleCount);

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
      />

      {visibleCount < transactions.length &&(
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

      <FloatingAddButton />
    </main>
  );
}

export default Dashboard;
