import { useState } from "react";
import "./Currency.css";

function Currency() {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");

  return (
    <main className="currency-page">
      <section className="currency-heading">
        <h1>Currency Converter</h1>
        <p>Convert between currencies with ease.</p>
      </section>

      <section className="currency-card">
        <div className="currency-field">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            min="0"
            step="any"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="currency-field">
          <label htmlFor="from-currency">From</label>
          <select
            id="from-currency"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}>
            <option value="USD">USD — US Dollar</option>
            <option value="GHS">GHS — Ghanaian Cedi</option>
            <option value="EUR">EUR — Euro</option>
            <option value="GBP">GBP — British Pound</option>
            <option value="NGN">NGN — Nigerian Naira</option>
          </select>
        </div>

        <div className="currency-field">
          <label htmlFor="to-currency">To</label>
          <select
            id="to-currency"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}>
            <option value="USD">USD — US Dollar</option>
            <option value="GHS">GHS — Ghanaian Cedi</option>
            <option value="EUR">EUR — Euro</option>
            <option value="GBP">GBP — British Pound</option>
            <option value="NGN">NGN — Nigerian Naira</option>
          </select>
        </div>

        <button type="button" disabled>
          Convert
        </button>

        <p className="currency-result">
          Your converted amount will appear here.
        </p>
      </section>
    </main>
  );
}

export default Currency;
