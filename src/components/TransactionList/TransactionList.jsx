import './TransactionList.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import TransactionItem from './TransactionItem';
import TransactionSearch from '../../features/transaction/search/TransactionSearch';
import CategoryFilter from '../../features/transaction/category/CategoryFilter';
import TypeFilter from '../../features/transaction/type/TypeFilter';
import TransactionSort from '../../features/transaction/sorting/TransactionSort';
import TransactionReset from '../../features/transaction/reset/TransactionReset';

function TransactionList({
  transactions,
  onDeleteTransaction,
  onEditTransaction,
}) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [sortBy, setSortBy] = useState('');

  /*
  const filteredCategory = transactions.filter(
    (transaction) => category === '' || transaction.category === category,
  );

  const filteredType = transactions.filter(
    (transaction) => type === '' || transaction.type === type,
  );
    
  const filterSearch = transactions.filter(
    (transaction) =>
      search === '' ||
      transaction.description.toLowerCase().includes(search.toLowerCase()) ||
      transaction.category.toLowerCase().includes(search.toLowerCase()) ||
      transaction.type.toLowerCase().includes(search.toLowerCase()),
  );


const filteredTransactions = transactions.filter((transaction) => {
    const searchableText =
      transaction.description.toLowerCase() +
      transaction.category.toLowerCase() +
      transaction.type.toLowerCase();

    return (
      (type === '' || transaction.type === type) &&
      (category === '' || transaction.category === category) &&
      (search === '' || searchableText.includes(searchTerm))
    );
  });

  */

  const searchTerm = search.toLowerCase();
  const filteredTransactions = transactions.filter(
    (transaction) =>
      (search === '' ||
        transaction.description.toLowerCase().includes(searchTerm) ||
        transaction.category.toLowerCase().includes(searchTerm) ||
        transaction.type.toLowerCase().includes(searchTerm)) &&
      (category === '' || transaction.category === category) &&
      (type === '' || transaction.type === type),
  );

  const transactionCount = filteredTransactions.length;

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === 'newest') {
      return b.date.localeCompare(a.date);
    }

    if (sortBy === 'oldest') {
      return a.date.localeCompare(b.date);
    }

    if (sortBy === 'highestAmount') {
      return b.amount - a.amount;
    }

    if (sortBy === 'lowestAmount') {
      return a.amount - b.amount;
    }
  });

  function resetFilters() {
    setSearch('');
    setCategory('');
    setType('');
    setSortBy('');
  }

  const hasNoTransactions = transactions.length === 0;
  const hasNoMatchingTransactions =
    transactions.length > 0 && sortedTransactions.length === 0;

  return (
    <section className="transaction-list">
      <div className="transaction-list-controls">
        <TransactionSearch
          search={search}
          onSearchChange={(e) => setSearch(e.target.value)}
        />

        <CategoryFilter
          category={category}
          onCategoryChange={(e) => setCategory(e.target.value)}
        />

        <TypeFilter type={type} onTypeChange={(e) => setType(e.target.value)} />

        <TransactionSort
          sortBy={sortBy}
          onSortByChange={(e) => setSortBy(e.target.value)}
        />

        <TransactionReset onReset={resetFilters} />
      </div>

      <div className="transaction-list-info">
        <div className="transaction-list-header">
          <div className="transaction-list-title">
            <h4>Transactions</h4>
            <p>{transactionCount}</p>
          </div>
          <Link to="/transactions">View All</Link>
        </div>

        <div className="transaction-list-items">
          {hasNoTransactions ? (
            <div className="no-transaction">
              <h4>No transactions available</h4>
              <p>
                Start tracking your income and expenses by adding your first
                transaction.
              </p>
            </div>
          ) : hasNoMatchingTransactions ? (
            <div className="no-transaction">
              <h4>No Transaction Found</h4>
              <p>Try changing your search or filters.</p>
            </div>
          ) : (
            sortedTransactions.map((transaction) => (
              <TransactionItem
                transaction={transaction}
                onDeleteTransaction={onDeleteTransaction}
                onEditTransaction={onEditTransaction}
                key={transaction.id}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default TransactionList;
