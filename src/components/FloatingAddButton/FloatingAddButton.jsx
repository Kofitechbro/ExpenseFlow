import './FloatingAddButton.css';
import { useNavigate } from 'react-router-dom';

function FloatingAddButton({children}) {
  const navigate = useNavigate();

  function handleTransactionNew() {
    navigate('/transactions/new');
  }

  return (
    <div className="floating-button">
      <button onClick={handleTransactionNew} type="button">
        {children}
      </button>
    </div>
  );
}

export default FloatingAddButton;
