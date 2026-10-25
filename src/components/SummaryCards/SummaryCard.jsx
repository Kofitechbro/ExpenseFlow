function SummaryCard({ title, amount }) {
  return (
    <div className="summary-card">
      <p>{title}</p>
      <h3>₵{amount.toFixed(2)}</h3>
    </div>
  );
}

export default SummaryCard;
