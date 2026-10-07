import TransactionForm from '../../components/TransactionForm/TransactionForm';
import { Navigate, useParams } from 'react-router-dom';

function TransactionFormPage({
  transactions,
  onAddTransaction,
  onUpdateTransaction,
  onCancelEdit,
}) {
  const { id } = useParams();
  const editingTransaction = id
    ? transactions.find((transaction) => String(transaction.id) === id)
    : null;

  if (id && !editingTransaction) {
    return <Navigate to="/transactions" replace />;
  }

  return (
    <TransactionForm
      key={editingTransaction ? editingTransaction.id : 'new'}
      onAddTransaction={onAddTransaction}
      editingTransaction={editingTransaction}
      onUpdateTransaction={onUpdateTransaction}
      onCancelEdit={onCancelEdit}
    />
  );
}

export default TransactionFormPage;
