import TransactionList from '../../components/TransactionList/TransactionList';
import './Transactions.css';

function Transactions({
  transactions,
  onDeleteTransaction,
  onEditTransaction,
}) {
  return (
    <main className="transactions-page">
      <div className="transactions-page-header">
        <h1>Transactions</h1>
        <p>Manage and review all your income and expenses</p>
      </div>

      <TransactionList
        transactions={transactions}
        onDeleteTransaction={onDeleteTransaction}
        onEditTransaction={onEditTransaction}
        showViewAll={false}
      />
    </main>
  );
}

export default Transactions;
