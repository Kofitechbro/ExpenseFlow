import SummaryCards from '../../components/SummaryCards/SummaryCards';
import TransactionList from '../../components/TransactionList/TransactionList';
import FloatingAddButton from '../../components/FloatingAddButton/FloatingAddButton';

function Dashboard({ transactions, onDeleteTransaction, onEditTransaction }) {
  return (
    <main>
      <SummaryCards transactions={transactions} />

      <TransactionList
        transactions={transactions}
        onDeleteTransaction={onDeleteTransaction}
        onEditTransaction={onEditTransaction}
      />

      <FloatingAddButton />
    </main>
  );
}

export default Dashboard;
