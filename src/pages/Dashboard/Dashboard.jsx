import SummaryCards from '../../components/SummaryCards/SummaryCards';
import TransactionList from '../../components/TransactionList/TransactionList';
import TransactionForm from '../../components/TransactionForm/TransactionForm';

function Dashboard({
  transactions,
  onDeleteTransaction,
  onEditTransaction,
  onAddTransaction,
  editingTransaction,
  onUpdateTransaction,
  onCancelEdit,
}) {
  return (
    <main>
      <SummaryCards transactions={transactions} />
      <section className="dashboard-content">
        <TransactionList
          transactions={transactions}
          onDeleteTransaction={onDeleteTransaction}
          onEditTransaction={onEditTransaction}
        />
        <TransactionForm
          onAddTransaction={onAddTransaction}
          editingTransaction={editingTransaction}
          onUpdateTransaction={onUpdateTransaction}
          onCancelEdit={onCancelEdit}
        />
      </section>
    </main>
  );
}

export default Dashboard;
