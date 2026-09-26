import './FloatingAddButton.css';
import { useNavigate } from 'react-router-dom';

function FloatingAddButton() {
  const navigate = useNavigate();

  function handleTransactionNew() {
    navigate('/transactions/new');
  }

  return (
    <div className="floating-button">
      <button onClick={handleTransactionNew} type="button">
        Add Transaction
      </button>
    </div>
  );
}

export default FloatingAddButton;
