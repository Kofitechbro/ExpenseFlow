import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Budget from './pages/Budget/Budget';
import Currency from './pages/Currency/Currency';
import Dashboard from './pages/Dashboard/Dashboard';
import Transactions from './pages/Transactions/Transactions';

import './App.css';
import Header from './components/Header/Header';

function App() {
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: 'Income',
      amount: 1000,
      description: 'Freelance Payment',
      category: 'Freelance',
      date: '2026-09-10',
      paymentMethod: 'Mobile Money',
    },

    {
      id: 2,
      type: 'Expense',
      amount: 500,
      description: 'Groceries',
      category: 'Food',
      date: '2026-09-10',
      paymentMethod: 'Mobile Money',
    },

    {
      id: 3,
      type: 'Income',
      amount: 2000,
      description: 'Monthly Salary',
      category: 'Salary',
      date: '2026-09-01',
      paymentMethod: 'Bank Transfer',
    },

    {
      id: 4,
      type: 'Expense',
      amount: 1000,
      description: 'Rent Payment',
      category: 'Housing',
      date: '2026-09-05',
      paymentMethod: 'Bank Transfer',
    },
  ]);

  function handleAddTransaction(transaction) {
    setTransactions([...transactions, transaction]);
  }

  function handleDeleteTransaction(id) {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id),
    );
  }

  function handleEditTransaction(transaction) {
    setEditingTransaction(transaction);
  }

  function handleUpdateTransaction(updatedTransaction) {
    setTransactions(
      transactions.map((transaction) => {
        if (transaction.id === updatedTransaction.id) {
          return updatedTransaction;
        }

        return transaction;
      }),
    );

    setEditingTransaction(null);
  }

  function handleCancelEdit() {
    setEditingTransaction(null);
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
                onAddTransaction={handleAddTransaction}
                editingTransaction={editingTransaction}
                onUpdateTransaction={handleUpdateTransaction}
                onCancelEdit={handleCancelEdit}
              />
            }
          />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/currency" element={<Currency />} />
        </Routes>
      
    </div>
  );
}

export default App;







///