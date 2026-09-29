import TransactionList from '../../components/TransactionList/TransactionList';

function Transactions({
  transactions,
  onDeleteTransaction,
  onEditTransaction,
}) {
  return (
    <TransactionList
      transactions={transactions}
      onDeleteTransaction={onDeleteTransaction}
      onEditTransaction={onEditTransaction}
      showViewAll={false}
    />
  );
}

export default Transactions;
