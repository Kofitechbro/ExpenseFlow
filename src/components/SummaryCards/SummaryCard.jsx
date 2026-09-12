function SummaryCard({title, amount}) {
  return (
    <div className="summary-card">
      <h3>{title}</h3>
      <p>₵{amount.toFixed(2)}</p>
    </div>
  );
}

export default SummaryCard;