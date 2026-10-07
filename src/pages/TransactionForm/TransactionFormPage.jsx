import TransactionForm from '../../components/TransactionForm/TransactionForm';
import { useParams, Navigate } from 'react-router-dom';

function TransactionFormPage({
  transactions,
  onAddTransaction,
  onUpdateTransaction,
  onCancelEdit,
}) {
  const { id } = useParams();

  const editingTransaction = transactions.find(
    (transaction) => String(transaction.id) === id,
  );

  // If the transaction is not found, redirect to the home page
  if (id && !editingTransaction) {
    return <Navigate to="/" replace />;
  }

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
