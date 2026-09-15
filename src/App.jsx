import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import SummaryCards from './components/SummaryCards/SummaryCards';
import TransactionList from './components/TransactionList/TransactionList';

function App() {
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

  return (
    <div className="App">
      <Header />
      <main>
        <SummaryCards transactions={transactions} />
        <TransactionList transactions={transactions} />
      </main>
    </div>
  );
}

export default App;
