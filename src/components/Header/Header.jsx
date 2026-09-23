import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header>
      <nav>
        <span className="logo">ExpenseFlow</span>

        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/transactions">Transactions</Link>
          </li>
          <li>
            <Link to="/budget">Budget</Link>
          </li>
          <li>
            <Link to="/currency">Currency</Link>
          </li>
        </ul>

        <div className="header-actions">
          <button aria-label="Toggle theme">
            <i className="fas fa-sun"></i>
          </button>
          <button aria-label="Notifications">
            <i className="fas fa-bell"></i>
          </button>
          <button aria-label="Profile">
            <i className="fas fa-user"></i>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
