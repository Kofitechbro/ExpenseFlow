// import css
import './App.css';

// import useState and useEffect from react
import { useState, useEffect } from 'react';

// import react router
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// import pages
import Budget from './pages/Budget/Budget';
import Currency from './pages/Currency/Currency';
import Dashboard from './pages/Dashboard/Dashboard';
import Transactions from './pages/Transactions/Transactions';
import TransactionFormPage from './pages/TransactionForm/TransactionFormPage';

// import components
import Header from './components/Header/Header';
import initialTransactions from './data/transactions';
import initialBudgets from './data/budgetData';
import storage from './utils/storage';

// App component
function App() {
  // State for transactions
  const [transactions, setTransactions] = useState(() => {
    const storedTransactions = storage.getTransactions();
    return storedTransactions || initialTransactions;
  });

  // State for budget
  const [budgets, setBudgets] = useState(initialBudgets);

  // State for editing transaction
  const navigate = useNavigate();

  // Save transactions to local storage whenever they change
  useEffect(() => {
    storage.saveTransactions(transactions);
  }, [transactions]);

  // Function to handle adding a new transaction
  function handleAddTransaction(transaction) {
    setTransactions((current) => [...current, transaction]);
    navigate('/');
  }

  // Function to handle deleting a transaction
  function handleDeleteTransaction(id) {
    setTransactions((current) =>
      current.filter((transactions) => transactions.id !== id),
    );
  }

  // Function to handle editing a transaction
  function handleEditTransaction(transaction) {
    navigate(`/transactions/${transaction.id}/edit`);
  }

  // Function to handle updating a transaction after editing
  function handleUpdateTransaction(updatedTransaction) {
    setTransactions((current) =>
      current.map((transaction) => {
        if (transaction.id === updatedTransaction.id) {
          return updatedTransaction;
        }

        return transaction;
      }),
    );

    navigate('/');
  }

  // Function to handle canceling editing and navigate back to dashboard
  function handleCancelEdit() {
    navigate('/');
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        {/* Dashboard Route Page */}
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

        {/* Transactions Route Page */}
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

        {/* Budget Route Page */}
        <Route path="/budget" element={<Budget budgets={budgets} />} />

        {/* Currency Route Page */}
        <Route path="/currency" element={<Currency />} />

        {/* Add New Transaction Route Form Page */}
        <Route
          path="/transactions/new"
          element={
            <TransactionFormPage
              transactions={transactions}
              onAddTransaction={handleAddTransaction}
            />
          }
        />

        {/* Edit Old or existing Transaction Route Form Page */}
        <Route
          path="/transactions/:id/edit"
          element={
            <TransactionFormPage
              transactions={transactions}
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
