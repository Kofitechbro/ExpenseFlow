import { useState } from "react";

function TransactionItem({
  transaction,
  onDeleteTransaction,
  onEditTransaction,
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const amount = transaction.amount;
  const formattedAmount = amount.toLocaleString("en-GH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const date = new Date(transaction.date);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <>
      <div className="transaction-card">
        <div className="transaction-description">
          <span className="transaction-title">{transaction.description}</span>
        </div>

        <div className="transaction-category">
          <span className="transaction-main">{transaction.category}</span>
          <span
            className={`transaction-secondary transaction-${transaction.type.toLowerCase()}`}>
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

        <div className="transaction-actions">
          <button
            className="transaction-actions-button"
            type="button"
            onClick={() => {
              setIsOpen(!isOpen);
            }}>
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </button>

          {isOpen && (
            <div className="transaction-actions-menu">
              <div className="transaction-action">
                <button
                  className="transaction-action-edit"
                  onClick={() => {
                    onEditTransaction(transaction);
                    setIsOpen(false);
                  }}
                  type="button">
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
                <span className="transaction-tooltip">Edit</span>
              </div>

              <div className="transaction-action">
                <button
                  className="transaction-action-delete"
                  type="button"
                  onClick={() => {
                    setShowConfirm(true);
                    setIsOpen(false);
                  }}>
                  <i className="fa-solid fa-trash-can"></i>
                </button>
                <span className="transaction-tooltip">Delete</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {showConfirm && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this transaction?</p>
          <div className="delete-confirmation-actions">
            <button
              className="delete-cancel"
              onClick={() => {
                setShowConfirm(false);
                setIsOpen(false);
              }}>
              Cancel
            </button>
            <button
              className="delete-confirm"
              onClick={() => onDeleteTransaction(transaction.id)}>
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default TransactionItem;
