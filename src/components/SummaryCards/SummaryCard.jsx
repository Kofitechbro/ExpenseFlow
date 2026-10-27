import { FaWallet } from 'react-icons/fa';

function SummaryCard({ title, amount }) {
  return (
    <article className="summary-card">
      <span className="summary-icon"><FaWallet aria-hidden="true" /></span>
      <p>{title}</p>
      <h3>₵{amount.toFixed(2)}</h3>
    </article>
  );
}

export default SummaryCard;
