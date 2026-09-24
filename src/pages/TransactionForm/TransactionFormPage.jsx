import TransactionForm from '../../components/TransactionForm/TransactionForm';

function TransactionFormPage({
  onAddTransaction,
  editingTransaction,
  onUpdateTransaction,
  onCancelEdit,
}) {
  return (
    <TransactionForm
      onAddTransaction={onAddTransaction}
      editingTransaction={editingTransaction}
      onUpdateTransaction={onUpdateTransaction}
      onCancelEdit={onCancelEdit}
    />
  );
}

export default TransactionFormPage;
