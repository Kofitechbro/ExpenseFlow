function TransactionItem({ transaction }) {
  const amount = transaction.amount;
  const formattedAmount = amount.toLocaleString('en-GH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const date = new Date(transaction.date);
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="transaction-card">
      <div className="transaction-description">
        <span className="transaction-title">{transaction.description}</span>
      </div>

      <div className="transaction-category">
        <span className="transaction-main">{transaction.category}</span>
        <span
          className={`transaction-secondary transaction-${transaction.type.toLowerCase()}`}
        >
          {transaction.type}
        </span>
      </div>

      <div className="transaction-amount">
        <span className="transaction-main">₵{formattedAmount}</span>
        <span className="transaction-secondary">
          {transaction.paymentMethod}
        </span>
      </div>

      <div className="transaction-date">
        <span>{formattedDate}</span>
      </div>
    </div>
  );
}

export default TransactionItem;
