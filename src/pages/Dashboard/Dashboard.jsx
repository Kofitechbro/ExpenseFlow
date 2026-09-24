import SummaryCards from '../../components/SummaryCards/SummaryCards';
import TransactionList from '../../components/TransactionList/TransactionList';

function Dashboard({ transactions, onDeleteTransaction, onEditTransaction }) {
  return (
    <main>
      <SummaryCards transactions={transactions} />

      <TransactionList
        transactions={transactions}
        onDeleteTransaction={onDeleteTransaction}
        onEditTransaction={onEditTransaction}
      />
    </main>
  );
}

export default Dashboard;
