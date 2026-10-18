import { useState } from "react";
import "./Currency.css";

function Currency() {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [error, setError] = useState("");

  async function testApiRequest() {
    try {
      // Sends the HTTP request and waits for the server to respond.
      const response = await fetch(
        "https://api.frankfurter.dev/v2/rate/USD/EUR",
      );

      // Checks whether the HTTP response indicates success. If not, the code throws an error.
      if (!response.ok) {
        throw new Error("Failed to fetch exchange rate.");
      }

      // Reads and parses the JSON response into a JavaScript object.
      const data = await response.json();

      console.log(data);

      // block handles errors, such as a failed network request or an error thrown by our status check.
    } catch (error) {
      console.error("API request failed:", error);
    }
  }

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

        <button
          type="button"
          // disabled
          onClick={() => {
            validateAmount();
            testApiRequest();
          }}>
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
