function Header() {
  return (
    <header>
      <nav>
        <span className="logo">ExpenseFlow</span>

        <ul>
          <li>
            <a href="#">Dashboard</a>
          </li>
          <li>
            <a href="#">Transactions</a>
          </li>
          <li>
            <a href="#">Budget</a>
          </li>
          <li>
            <a href="#">Reports</a>
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
