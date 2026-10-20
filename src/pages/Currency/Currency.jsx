import { useState } from "react";
import "./Currency.css";

function Currency() {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("GHS");

  const [error, setError] = useState("");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function clearResult() {
    setExchangeRate(null);
    setConvertedAmount(null);
  }

  function validateAmount() {
    if (amount.trim() === "") {
      setError("Please enter an amount.");
      return false;
    }

    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError("Please enter a valid amount greater than zero");
      return false;
    }

    setError("");
    return true;
  }

  async function handleConvert() {
    if (!validateAmount()) {
      clearResult();
      return;
    }

    setError("");
    clearResult();

    if (fromCurrency === toCurrency) {
      setExchangeRate(1);
      setConvertedAmount(Number(amount));
      return;
    }

    setIsLoading(true);

    try {
      // Sends the HTTP request and waits for the server to respond.
      const response = await fetch(
        `https://api.frankfurter.dev/v2/rate/${fromCurrency}/${toCurrency}`,
      );

      // Checks whether the HTTP response indicates success. If not, the code throws an error.
      if (!response.ok) {
        throw new Error("The exchange rate could not be retrieved.");
      }

      // Reads and parses the JSON response into a JavaScript object.
      const data = await response.json();

      setExchangeRate(data.rate);

      const result = Number(amount) * data.rate;

      setConvertedAmount(parseFloat(result.toFixed(2)));

      // block handles errors, such as a failed network request or an error thrown by our status check.
    } catch (error) {
      console.error("API request failed:", error);
      setError("Unable to retrieve the exchange rate. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleAmountChange(e) {
    setAmount(e.target.value);
    clearResult();
    setError("");
  }

  function handleFromCurrencyChange(e) {
    setFromCurrency(e.target.value);
    clearResult();
    setError("");
  }

  function handleToCurrencyChange(e) {
    setToCurrency(e.target.value);
    clearResult();
    setError("");
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
            onChange={handleAmountChange}
          />
        </div>

        <div className="currency-field">
          <label htmlFor="from-currency">From</label>
          <select
            id="from-currency"
            value={fromCurrency}
            onChange={handleFromCurrencyChange}
          >
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
            onChange={handleToCurrencyChange}
          >
            <option value="EUR">EUR — Euro</option>
            <option value="USD">USD — US Dollar</option>
            <option value="CNY">CNY — Chinese Yuan</option>
            <option value="GBP">GBP — British Pound</option>
            <option value="GHS">GHS — Ghanaian Cedi</option>
            <option value="NGN">NGN — Nigerian Naira</option>
          </select>
        </div>

        <button type="button" disabled={isLoading} onClick={handleConvert}>
          {isLoading ? (
            <span className="loader" role="status" aria-label="Loading"></span>
          ) : (
            "Convert"
          )}
        </button>

        {error && (
          <p className="currency-error" role="alert">
            {error}
          </p>
        )}
        {exchangeRate !== null && convertedAmount !== null && (
          <section className="currency-result" aria-live="polite">
            <div className="currency-rate">
              <span>Exchange rate</span>
              <p>
                1 {fromCurrency} ={" "}
                {exchangeRate.toLocaleString("en-GH", {
                  maximumFractionDigits: 6,
                })}{" "}
                {toCurrency}
              </p>
            </div>
            <hr />
            <div className="currency-rate">
              <p className="currency-result-label">Converted amount</p>
              <h2>
                {convertedAmount.toLocaleString("en-GH", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                {toCurrency}
              </h2>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

export default Currency;
