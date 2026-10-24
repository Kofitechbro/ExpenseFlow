import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenu() {
    setIsMenuOpen((previousState) => !previousState);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header>
      <nav>
        <div className="nav-header-action">
          <button
            type="button"
            className="mobile-menu-button"
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={handleMenu}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>

          <span className="logo">ExpenseFlow</span>
        </div>

        <div className="desktop-nav">
          <NavLinks />
        </div>

        <HeaderAction />

        {isMenuOpen && (
          <MobileNav isMenuOpen={isMenuOpen} onClose={closeMenu} />
        )}
      </nav>
    </header>
  );
}

function MobileNav({ isMenuOpen, onClose }) {
  return (
    <div
      id="mobile-navigation"
      className={`mobile-nav ${isMenuOpen ? "open" : ""}`}
      aria-hidden={!isMenuOpen}
      inert={!isMenuOpen}
    >
      <NavLinks onNavigate={onClose} />
    </div>
  );
}

function NavLinks({ onNavigate }) {
  return (
    <ul className="nav-links">
      <li>
        <Link to="/" onClick={onNavigate}>
          Dashboard
        </Link>
      </li>

      <li>
        <Link to="/transactions" onClick={onNavigate}>
          Transactions
        </Link>
      </li>

      <li>
        <Link to="/budget" onClick={onNavigate}>
          Budget
        </Link>
      </li>

      <li>
        <Link to="/currency" onClick={onNavigate}>
          Currency
        </Link>
      </li>
    </ul>
  );
}

function HeaderAction() {
  return (
    <div className="header-actions">
      <button type="button" aria-label="Toggle theme">
        <i className="fas fa-sun"></i>
      </button>

      <button type="button" aria-label="Notifications">
        <i className="fas fa-bell"></i>
      </button>

      <button type="button" aria-label="Profile">
        <i className="fas fa-user"></i>
      </button>
    </div>
  );
}

export default Header;
