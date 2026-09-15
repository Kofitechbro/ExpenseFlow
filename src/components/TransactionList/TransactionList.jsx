import './TransactionList.css';
import TransactionItem from './TransactionItem';

function TransactionList({ transactions }) {
  const transactionCount = transactions.length;
  return (
    <section className="transaction-list">
      {/* <div className="transaction-list-actions"> */}
      <div className="transaction-list-controls">
        <input type="text" name="search" placeholder="Search transaction" />

        <select defaultValue="">
          <option value="" disabled>
            Select a Category
          </option>
          <option value="Health">Health</option>
          <option value="Food">Food & Drinks</option>
          <option value="Transportation">Transportation</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills & Utilities</option>
          <option value="Salary">Salary</option>
          <option value="Freelance">Freelance</option>
        </select>
      </div>
      {/* </div> */}

      <div className="transaction-list-info">
        <div className="transaction-list-header">
          <h4>Transactions</h4>
          <button type="button">View All</button>
        </div>

        <div className="transaction-list-items">
          {transactions.map((transaction) => (
            <TransactionItem transaction={transaction} key={transaction.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TransactionList;
