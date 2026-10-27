import { FaPlus } from 'react-icons/fa';

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
        <FaPlus aria-hidden="true" /> <span>{children}</span>
      </button>
    </div>
  );
}

export default FloatingAddButton;
