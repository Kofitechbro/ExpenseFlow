import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import SummaryCards from './components/SummaryCards/SummaryCards';

function App() {
  const [transactions, setTransactions] = useState([
    { type: 'income', amount: 1000 },
    { type: 'expense', amount: 500 },
    { type: 'income', amount: 2000 },
    { type: 'expense', amount: 1000 },
  ]);

  return (
    <div className="App">
      <Header />
      <main>
        <SummaryCards transactions={transactions} />
      </main>
    </div>
  );
}

export default App;
