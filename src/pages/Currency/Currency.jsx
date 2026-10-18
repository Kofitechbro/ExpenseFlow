import { useState } from "react";
import "./Currency.css";

function Currency() {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [error, setError] = useState("");

  function validateAmount() {
    if (amount.trim() === "") {
      setError("Please enter an amount.");
      return;
    }

    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError("Please enter a valid amount greater than zero");
      return;
    }

    setError("");
    return true;
  }

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

          {error && (
            <p className="currency-error" role="alert">
              {error}
            </p>
          )}
        </div>

        <div className="currency-field">
          <label htmlFor="from-currency">From</label>
          <select
            id="from-currency"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}>
            <option value="EUR">EUR — Euro</option>
            <option value="USD">USD — US Dollar</option>
            <option value="CNY">CNY — Chinese Yuan</option>
            <option value="GBP">GBP — British Pound</option>
            <option value="GHS">GHS — Ghanaian Cedi</option>
            <option value="NGN">NGN — Nigerian Naira</option>
          </select>
        </div>

        <div className="currency-field">
          <label htmlFor="to-currency">To</label>
          <select
            id="to-currency"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}>
            <option value="EUR">EUR — Euro</option>
            <option value="USD">USD — US Dollar</option>
            <option value="CNY">CNY — Chinese Yuan</option>
            <option value="GBP">GBP — British Pound</option>
            <option value="GHS">GHS — Ghanaian Cedi</option>
            <option value="NGN">NGN — Nigerian Naira</option>
          </select>
        </div>

        <button type="button" disabled onClick={validateAmount}>
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
