import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Budget from './pages/Budget/Budget';
import Currency from './pages/Currency/Currency';
import Dashboard from './pages/Dashboard/Dashboard';
import Transactions from './pages/Transactions/Transactions';
import TransactionFormPage from './pages/TransactionForm/TransactionFormPage';

import './App.css';
import Header from './components/Header/Header';
import initialTransactions from './data/transactions';

function App() {
  const [transactions, setTransactions] = useState(initialTransactions);
  // const [editingTransaction, setEditingTransaction] = useState(null);
  const navigate = useNavigate();

  function handleAddTransaction(transaction) {
    setTransactions((current) => [...current, transaction]);
    navigate('/');
  }

  function handleDeleteTransaction(id) {
    setTransactions((current) =>
      current.filter((transactions) => transactions.id !== id),
    );
  }

  function handleEditTransaction(transaction) {
    // setEditingTransaction(transaction);
    navigate(`/transactions/${transaction.id}/edit`);
  }

  function handleUpdateTransaction(updatedTransaction) {
    setTransactions((current) =>
      current.map((transaction) => {
        if (transaction.id === updatedTransaction.id) {
          return updatedTransaction;
        }

        return transaction;
      }),
    );

    // setEditingTransaction(null);
    navigate('/');
  }

  function handleCancelEdit() {
    // setEditingTransaction(null);
    navigate('/');
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              transactions={transactions}
              onDeleteTransaction={handleDeleteTransaction}
              onEditTransaction={handleEditTransaction}
            />
          }
        />
        <Route
          path="/transactions"
          element={
            <Transactions
              transactions={transactions}
              onDeleteTransaction={handleDeleteTransaction}
              onEditTransaction={handleEditTransaction}
            />
          }
        />
        <Route path="/budget" element={<Budget />} />
        <Route path="/currency" element={<Currency />} />
        <Route
          path="/transactions/new"
          element={
            <TransactionFormPage onAddTransaction={handleAddTransaction} />
          }
        />
        <Route
          path="/transactions/:id/edit"
          element={
            <TransactionFormPage
              transactions={transactions}
              onAddTransaction={handleAddTransaction}
              onUpdateTransaction={handleUpdateTransaction}
              onCancelEdit={handleCancelEdit}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
