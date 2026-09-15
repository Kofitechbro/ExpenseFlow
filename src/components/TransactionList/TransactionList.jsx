import './TransactionList.css';
import TransactionItem from './TransactionItem';
import { useState } from 'react';

function TransactionList({ transactions }) {
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');

  const filteredCategory = transactions.filter(
    (transaction) => category === '' || transaction.category === category,
  );

  return (
    <section className="transaction-list">
      <div className="transaction-list-controls">
        <input type="text" name="search" placeholder="Search transaction" />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="" disabled>
            Select a Category
          </option>
          <option value="Health">Health</option>
          <option value="Food & Drinks">Food & Drinks</option>
          <option value="Transportation">Transportation</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills & Utilities">Bills & Utilities</option>
          <option value="Salary">Salary</option>
          <option value="Freelance">Freelance</option>
        </select>

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="" disabled>
            Type
          </option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>

      <div className="transaction-list-info">
        <div className="transaction-list-header">
          <h4>Transactions</h4>
          <button type="button">View All</button>
        </div>

        <div className="transaction-list-items">
          {filteredCategory.map((transaction) => (
            <TransactionItem transaction={transaction} key={transaction.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TransactionList;
